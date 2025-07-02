import { computed, ref, type Ref } from 'vue'
import { debounce } from 'lodash-es'
import { type PersistenceDriver } from '../../service/persistenceDrivers'
import { NonPersistentDriver } from '../../service/persistenceDrivers'

export interface StateOptions {
  persist?: boolean
  persistSuffix?: string
}

// Generic type for change handlers
type ChangeHandler<T> = (val: T, oldVal: T) => void

// Generic type for registered hooks
interface RegisteredHook<T> {
  handler: ChangeHandler<T>
  prevVal: T
  debouncedHandler?: (val: T, oldVal: T) => void
  executeOnReset?: boolean
}

// Type for accessing nested properties with dot notation
type PathValue<T, P extends string> =
  P extends keyof T ? T[P] :
    P extends `${infer K}.${infer Rest}` ?
      K extends keyof T ?
        T[K] extends Record<string, unknown> ?
          PathValue<T[K], Rest> :
          never :
        never :
      never

// Helper type to get all possible paths in an object
type PathsToStringProps<T> = T extends object ?
  { [K in keyof T]: K extends string ?
    K | `${K}.${PathsToStringProps<T[K]>}` :
    never
  }[keyof T] :
  never

// Union type of all possible dot-notation paths in T
type Path<T> = keyof T | PathsToStringProps<T>

export abstract class State<T extends object> {
  private readonly properties: { [K in keyof T]: Ref<T[K]> }
  private _changeHooks: { [K in keyof T]?: RegisteredHook<T[K]> } = {}
  private _nestedChangeHooks: Map<string, RegisteredHook<unknown>> = new Map()
  private readonly _initial: T
  private readonly _persist: boolean
  private readonly _persistKey: string
  private _driver: PersistenceDriver
  private _stateProxy: T | null = null

  protected constructor(initial: T, options?: StateOptions) {
    this._initial = initial
    this._persist = !!options?.persist
    const className = this.constructor.name
    this._persistKey = className + (options?.persistSuffix ? `_${options.persistSuffix}` : '')
    this._driver = this.getPersistenceDriver()

    // --- Robust persistence load: invalidate if schema changed ---
    let loaded: T | null = null
    if (this._persist) {
      loaded = this._driver.get<T>(this._persistKey)
      if (loaded) {
        const initialKeys = Object.keys(initial).sort()
        const loadedKeys = Object.keys(loaded).sort()
        const sameKeys = initialKeys.length === loadedKeys.length && initialKeys.every((k, i) => k === loadedKeys[i])
        if (!sameKeys) {
          // Schema mismatch: remove stale/corrupt data, use fresh
          this._driver.remove(this._persistKey)
          loaded = null
        }
      }
    }

    // Use the valid loaded state, or fallback to initial
    const base = loaded ?? initial
    this.properties = {} as { [K in keyof T]: Ref<T[K]> }
    const keys = Object.keys(base) as Array<keyof T>

    for (const k of keys) {
      const _ref = ref((base as T)[k]) as Ref<T[typeof k]>

      // Special handling for objects - wrap them in a reactive proxy
      if (typeof _ref.value === 'object' && _ref.value !== null && !Array.isArray(_ref.value)) {
        _ref.value = this.createDeepWatchedObject(k.toString(), _ref.value) as T[typeof k]
      }

      this.properties[k] = computed({
        get: () => _ref.value,
        set: (val) => {
          const oldVal = this.deepClone(_ref.value)

          // If this is an object, wrap it in our special proxy
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            _ref.value = this.createDeepWatchedObject(k.toString(), val) as T[typeof k]
          } else {
            _ref.value = val
          }

          if (this._persist) {
            this._driver.set(this._persistKey, this.export())
          }

          // Trigger the hook for this property
          const hook = this._changeHooks[k]
          if (hook) {
            if (hook.debouncedHandler) {
              hook.debouncedHandler(_ref.value, hook.prevVal)
            } else {
              hook.handler(_ref.value, hook.prevVal)
              hook.prevVal = this.deepClone(_ref.value)
            }
          }

          // If this is an object, also check for changes to nested properties
          if (typeof val === 'object' && val !== null && !Array.isArray(val) &&
            typeof oldVal === 'object' && oldVal !== null && !Array.isArray(oldVal)) {
            this.compareAndTriggerNestedHooks(k.toString(), val, oldVal)
          }
        }
      }) as Ref<T[typeof k]>
    }
  }

  /**
   * Safe deep clone that preserves types
   */
  private deepClone<V>(value: V): V {
    if (value === null || value === undefined) return value
    if (typeof value !== 'object') return value

    return JSON.parse(JSON.stringify(value)) as V
  }

  /**
   * Creates a special object that maintains reactivity and triggers hooks when modified
   */
  private createDeepWatchedObject<V>(path: string, obj: V): V {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      return obj;
    }

    const self = this;
    return new Proxy(obj as object, {
      get(target, prop) {
        if (typeof prop === 'symbol' || prop === 'toJSON') {
          return Reflect.get(target, prop);
        }

        const value = Reflect.get(target, prop);

        // If nested object, create another proxy
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return self.createDeepWatchedObject(`${path}.${String(prop)}`, value);
        }

        return value;
      },
      set(target, prop, value) {
        if (typeof prop === 'symbol') {
          return Reflect.set(target, prop, value);
        }

        const fullPath = `${path}.${String(prop)}`;

        // Set the value
        Reflect.set(target, prop, value);

        // Get the top-level key
        const topLevelKey = path.split('.')[0] as keyof T;

        // Trigger persistence
        if (self._persist) {
          self._driver.set(self._persistKey, self.export());
        }

        // Trigger the hook for this nested property
        const hook = self._nestedChangeHooks.get(fullPath);
        if (hook) {
          if (hook.debouncedHandler) {
            hook.debouncedHandler(value, hook.prevVal);
          } else {
            hook.handler(value, hook.prevVal);
            hook.prevVal = value;
          }
        }

        // Manually trigger the hook for the parent property
        // This is crucial for components that modify nested properties
        const parentHook = self._changeHooks[topLevelKey];
        if (parentHook) {
          const parentValue = self.properties[topLevelKey].value;
          if (parentHook.debouncedHandler) {
            parentHook.debouncedHandler(parentValue, parentHook.prevVal);
          } else {
            hook.handler(parentValue, parentHook.prevVal);
            parentHook.prevVal = self.deepClone(parentValue);
          }
        }

        return true;
      }
    }) as V;
  }

  /**
   * Compare nested objects and trigger hooks for changed properties
   */
  private compareAndTriggerNestedHooks<V extends object>(
    path: string,
    newObj: V,
    oldObj: V
  ): void {
    // Get all properties from both objects
    const allProps = new Set([
      ...Object.keys(oldObj),
      ...Object.keys(newObj)
    ])

    for (const prop of allProps) {
      const fullPath = `${path}.${prop}`
      const oldValue = (oldObj as Record<string, unknown>)[prop]
      const newValue = (newObj as Record<string, unknown>)[prop]

      // Check if the value changed
      if (!this.isEqual(oldValue, newValue)) {
        // Trigger hook for this specific path
        const hook = this._nestedChangeHooks.get(fullPath)
        if (hook) {
          if (hook.debouncedHandler) {
            hook.debouncedHandler(newValue, hook.prevVal)
          } else {
            hook.handler(newValue, hook.prevVal)
            hook.prevVal = newValue
          }
        }

        // If both are objects, recurse
        if (typeof oldValue === 'object' && oldValue !== null && !Array.isArray(oldValue) &&
          typeof newValue === 'object' && newValue !== null && !Array.isArray(newValue)) {
          this.compareAndTriggerNestedHooks(
            fullPath,
            newValue as object,
            oldValue as object
          )
        }
      }
    }
  }

  /**
   * Simple deep equality check
   */
  private isEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true

    if (a === null || b === null) return false
    if (a === undefined || b === undefined) return false

    if (typeof a !== typeof b) return false

    if (typeof a === 'object' && typeof b === 'object') {
      const aArray = Array.isArray(a)
      const bArray = Array.isArray(b)

      if (aArray !== bArray) return false

      if (aArray && bArray) {
        const arrayA = a as unknown[]
        const arrayB = b as unknown[]
        if (arrayA.length !== arrayB.length) return false
        return arrayA.every((val, i) => this.isEqual(val, arrayB[i]))
      }

      const objA = a as Record<string, unknown>
      const objB = b as Record<string, unknown>

      const keysA = Object.keys(objA).sort()
      const keysB = Object.keys(objB).sort()

      if (keysA.length !== keysB.length) return false
      if (!keysA.every((k, i) => k === keysB[i])) return false

      return keysA.every(k => this.isEqual(objA[k], objB[k]))
    }

    return false
  }

  /**
   * Get a proxy to the state that allows direct property access and setting
   * without using .value
   */
  public get state(): T {
    if (!this._stateProxy) {
      this._stateProxy = new Proxy({} as T, {
        get: (_, prop: string | symbol) => {
          if (typeof prop === 'symbol' || prop === 'toJSON') {
            return undefined
          }

          const key = prop as keyof T
          if (key in this.properties) {
            return this.properties[key].value
          }

          return undefined
        },
        set: (_, prop: string | symbol, value) => {
          if (typeof prop === 'symbol') {
            return false
          }

          const key = prop as keyof T
          if (key in this.properties) {
            this.properties[key].value = value
          }

          return true
        }
      })
    }

    return this._stateProxy
  }

  /**
   * Add a subscription to specific properties or nested properties
   * @param paths Path(s) to the property. Can be:
   *              - A single path (top-level key or nested with dot notation)
   *              - An array of paths to watch (triggers when any changes)
   * @param handler Function to call when the property changes
   * @param options Optional configuration for debounce and reset behavior
   */
  public subscribe<P extends Path<T>>(
    paths: P,
    handler: ChangeHandler<PathValue<T, P & string>>,
    options?: { debounce?: number; executeOnReset?: boolean }
  ): void
  public subscribe<P extends Path<T>>(
    paths: P[],
    handler: (changedPath: P, state: T) => void,
    options?: { debounce?: number; executeOnReset?: boolean }
  ): void
  public subscribe<P extends Path<T>>(
    paths: P | P[],
    handler: ChangeHandler<PathValue<T, P & string>> | ((changedPath: P, state: T) => void),
    options?: { debounce?: number; executeOnReset?: boolean }
  ): void {
    // If paths is an array, register handlers for each path
    if (Array.isArray(paths)) {
      for (const path of paths) {
        // For arrays, we expect the handler to have the signature (changedPath, state) => void
        const pathHandler: ChangeHandler<PathValue<T, P & string>> = () => {
          (handler as (changedPath: P, state: T) => void)(path, this.export())
        }

        // Register handler for this individual path
        this.registerPathChangeHandler(path, pathHandler, options)
      }
    } else {
      // For single paths, register directly with the provided handler
      this.registerPathChangeHandler(paths, handler as ChangeHandler<PathValue<T, P & string>>, options)
    }
  }

  /**
   * Internal method to register a change handler for a specific path
   */
  private registerPathChangeHandler<P extends Path<T>>(
    path: P,
    handler: ChangeHandler<PathValue<T, P & string>>,
    options?: { debounce?: number; executeOnReset?: boolean }
  ): void {
    const pathStr = path as string

    // Check if this is a top-level property
    if (pathStr in this.properties) {
      const key = pathStr as keyof T
      const prevVal = this.deepClone(this.properties[key].value)
      const hook: RegisteredHook<T[typeof key]> = {
        handler: handler as ChangeHandler<T[typeof key]>,
        prevVal,
        executeOnReset: options?.executeOnReset ?? false
      }

      if (options?.debounce && options.debounce > 0) {
        hook.debouncedHandler = debounce((val: T[typeof key], oldVal: T[typeof key]) => {
          (handler as ChangeHandler<T[typeof key]>)(val, oldVal)
          hook.prevVal = this.deepClone(val)
        }, options.debounce)
      }

      this._changeHooks[key] = hook
    }
    // Handle nested properties
    else if (pathStr.includes('.')) {
      const prevVal = this.getValueByPath(pathStr)

      if (prevVal !== undefined) {
        const hook: RegisteredHook<unknown> = {
          handler: handler as ChangeHandler<unknown>,
          prevVal,
          executeOnReset: options?.executeOnReset ?? false
        }

        if (options?.debounce && options.debounce > 0) {
          hook.debouncedHandler = debounce((val: unknown, oldVal: unknown) => {
            (handler as ChangeHandler<unknown>)(val, oldVal)
            hook.prevVal = val
          }, options.debounce)
        }

        this._nestedChangeHooks.set(pathStr, hook)
      }
    }
  }

  /**
   * Get a value from the state using a dot-notation path
   */
  private getValueByPath(path: string): unknown {
    const parts = path.split('.')
    const topLevelKey = parts[0] as keyof T

    if (!(topLevelKey in this.properties)) {
      return undefined
    }

    let value: unknown = this.properties[topLevelKey].value

    for (let i = 1; i < parts.length; i++) {
      if (!value || typeof value !== 'object') {
        return undefined
      }

      value = (value as Record<string, unknown>)[parts[i]]
    }

    return value
  }

  protected getPersistenceDriver(): PersistenceDriver {
    return new NonPersistentDriver()
  }

  public export(): T {
    const out = {} as T
    for (const k in this.properties) {
      const key = k as keyof T
      out[key] = this.deepClone(this.properties[key].value)
    }
    return out
  }

  public import(data: Partial<T>, suppressHooks = false): void {
    for (const k in data) {
      if (k in this.properties) {
        const key = k as keyof T
        // Suppress hooks if needed
        if (suppressHooks) {
          // Temporarily remove the hook for this property
          const oldHook = this._changeHooks[key]
          delete this._changeHooks[key]
          this.properties[key].value = data[key] as T[typeof key]
          // Restore hook
          if (oldHook) this._changeHooks[key] = oldHook
        } else {
          this.properties[key].value = data[key] as T[typeof key]
        }
      }
    }
    if (this._persist) {
      this._driver.set(this._persistKey, this.export())
    }
  }

  public reset(): void {
    // On reset, suppress hooks unless executeOnReset is true for that field
    const prevHooks = { ...this._changeHooks }
    const prevNestedHooks = new Map(this._nestedChangeHooks)

    // Clear all hooks that shouldn't execute on reset
    for (const k in this._initial) {
      const key = k as keyof T
      const hook = prevHooks[key]
      if (!hook || !hook.executeOnReset) {
        delete this._changeHooks[key]
      }
    }

    for (const [path, hook] of prevNestedHooks.entries()) {
      if (!hook.executeOnReset) {
        this._nestedChangeHooks.delete(path)
      }
    }

    this.import(this._initial)

    // Restore all hooks
    this._changeHooks = prevHooks
    this._nestedChangeHooks = prevNestedHooks
  }

  public get persistKey(): string {
    return this._persistKey
  }
}