import { reactive, computed, toRaw, type ComputedRef, watch } from 'vue'
import { camelCase, upperFirst, cloneDeep, isEqual } from 'lodash-es'
import { type PersistedForm } from './types/PersistedForm'
import { NonPersistentDriver } from './drivers/NonPersistentDriver'
import { type PersistenceDriver } from './types/PersistenceDriver'

/** Helper: shallow-merge source object into target. */
function shallowMerge(target: any, source: any): any {
  Object.assign(target, source)
  return target
}

/** Helper: if both values are arrays, update each element if possible, otherwise replace. */
function deepMergeArrays(target: any[], source: any[]): any[] {
  if (target.length !== source.length) {
    return source
  }
  return target.map((t, i) => {
    const s = source[i]
    if (t && typeof t === 'object' && s && typeof s === 'object') {
      return shallowMerge({ ...t }, s)
    }
    return s
  })
}

/**
 * A generic base class for forms.
 *
 * @template RequestBody - The final payload shape (what is sent to the server).
 * @template FormBody - The raw form data shape (before any mutators are applied).
 *
 * (We assume that for every key in RequestBody there is a corresponding key in FormBody.)
 */
export abstract class BaseForm<
  RequestBody extends object,
  FormBody extends { [K in keyof RequestBody]: unknown }
> {
  public readonly state: FormBody
  private dirty: Record<keyof FormBody, boolean | any[]>
  private readonly original: FormBody
  private readonly _model: { [K in keyof FormBody]: ComputedRef<FormBody[K]> }
  private _errors: any = reactive({})
  private _suggestions: any = reactive({})

  /**
   * Returns the persistence driver to use.
   * The default is a NonPersistentDriver.
   * Child classes can override this method to return a different driver.
   */
  protected getPersistenceDriver(_suffix: string | undefined): PersistenceDriver {
    return new NonPersistentDriver()
  }

  /**
   * Helper: recursively computes the dirty state for a value based on the original.
   */
  private computeDirtyState(current: any, original: any): any {
    if (Array.isArray(current) && Array.isArray(original)) {
      return current.map((el, i) => this.computeDirtyState(el, original[i]))
    } else if (current && typeof current === 'object' && original && typeof original === 'object') {
      const dirty: Record<string, boolean> = {}
      for (const key in current) {
        if (Object.prototype.hasOwnProperty.call(current, key)) {
          dirty[key] = !isEqual(current[key], original[key])
        }
      }
      return dirty
    }

    return !isEqual(current, original)
  }

  protected constructor(defaults: FormBody, protected options?: { persist?: boolean, persistSuffix?: string }) {
    const persist = options?.persist !== false
    let initialData: FormBody
    const driver = this.getPersistenceDriver(options?.persistSuffix)

    if (persist) {
      const persisted = driver.get<FormBody>(this.constructor.name)
      // If persisted exists and its "original" matches the new defaults,
      // use the persisted state otherwise, discard it.
      if (persisted && isEqual(defaults, persisted.original)) {
        initialData = persisted.state
        this.original = cloneDeep(persisted.original)
        this.dirty = reactive(persisted.dirty) as Record<keyof FormBody, boolean | any[]>
      } else {
        // Discard persisted data: use new defaults as the baseline.
        initialData = defaults
        this.original = cloneDeep(defaults)
        const initDirty: Partial<Record<keyof FormBody, boolean | any[]>> = {}
        for (const key in defaults) {
          if (Array.isArray(defaults[key])) {
            initDirty[key as keyof FormBody] = (defaults[key] as any[]).map((item) => {
              if (item && typeof item === 'object') {
                const obj: Record<string, boolean> = {}
                for (const k in item) {
                  if (Object.prototype.hasOwnProperty.call(item, k)) {
                    obj[k] = false
                  }
                }
                return obj
              }
              return false
            })
          } else {
            initDirty[key as keyof FormBody] = false
          }
        }
        this.dirty = reactive(initDirty) as Record<keyof FormBody, boolean | any[]>

        driver.remove(this.constructor.name)
      }
    } else {
      initialData = defaults
      this.original = cloneDeep(defaults)
      const initDirty: Partial<Record<keyof FormBody, boolean | any[]>> = {}
      for (const key in defaults) {
        if (Array.isArray(defaults[key])) {
          initDirty[key as keyof FormBody] = (defaults[key] as any[]).map((item) => {
            if (item && typeof item === 'object') {
              const obj: Record<string, boolean> = {}
              for (const k in item) {
                if (Object.prototype.hasOwnProperty.call(item, k)) {
                  obj[k] = false
                }
              }
              return obj
            }
            return false
          })
        } else {
          initDirty[key as keyof FormBody] = false
        }
      }
      this.dirty = reactive(initDirty) as Record<keyof FormBody, boolean | any[]>
    }

    this.state = reactive(initialData) as FormBody
    this._model = {} as { [K in keyof FormBody]: ComputedRef<FormBody[K]> }

    for (const key in this.state) {
      this._model[key as keyof FormBody] = computed({
        get: () => this.state[key],
        set: (value: FormBody[typeof key]) => {
          this.state[key] = value
          this.dirty[key as keyof FormBody] = this.computeDirtyState(
            value,
            this.original[key]
          )
          if (persist) {
            driver.set(this.constructor.name, {
              state: toRaw(this.state),
              original: toRaw(this.original),
              dirty: toRaw(this.dirty)
            } as PersistedForm<FormBody>)
          }
        },
      })
    }

    if (persist) {
      watch(
        () => this.state,
        () => {
          driver.set(this.constructor.name, {
            state: toRaw(this.state),
            original: toRaw(this.original),
            dirty: toRaw(this.dirty)
          } as PersistedForm<FormBody>)
        },
        { deep: true, immediate: true }
      )
    }
  }

  public fillErrors<ErrorInterface>(errorsData: ErrorInterface): void {
    for (const key in this._errors) {
      delete this._errors[key]
    }
    for (const key in errorsData) {
      if (Object.prototype.hasOwnProperty.call(errorsData, key)) {
        const parts = key.split('.')
        if (parts.length > 1) {
          const topKey = parts[0]
          const index = parseInt(parts[1], 10)
          const errorKey = parts.slice(2).join('.')
          if (!this._errors[topKey]) {
            this._errors[topKey] = []
          }
          if (!this._errors[topKey][index]) {
            this._errors[topKey][index] = {}
          }
          this._errors[topKey][index][errorKey] = errorsData[key]
        } else {
          this._errors[key] = errorsData[key]
        }
      }
    }
  }

  public fillState(data: Partial<FormBody>): void {
    const driver = this.getPersistenceDriver(this.options?.persistSuffix)
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && key in this.state) {
        const currentVal = this.state[key]
        const newVal = data[key]
        if (Array.isArray(newVal) && Array.isArray(currentVal)) {
          if (newVal.length === currentVal.length) {
            this.state[key] = deepMergeArrays(currentVal, newVal) as any
          } else {
            this.state[key] = newVal as any
          }
        } else if (newVal && typeof newVal === 'object' && currentVal && typeof currentVal === 'object') {
          this.state[key] = shallowMerge({ ...currentVal }, newVal)
        } else {
          this.state[key] = newVal as any
        }
        this.dirty[key as keyof FormBody] = this.computeDirtyState(
          this.state[key],
          this.original[key]
        )
      }
    }
    driver.set(this.constructor.name, {
      state: toRaw(this.state),
      original: toRaw(this.original),
      dirty: toRaw(this.dirty)
    } as PersistedForm<FormBody>)
  }

  public fillSuggestions(suggestionsData: Partial<Record<keyof FormBody, string[] | object[]>>): void {
    for (const key in suggestionsData) {
      if (Object.prototype.hasOwnProperty.call(suggestionsData, key)) {
        this._suggestions[key] = suggestionsData[key]
      }
    }
  }

  private transformValue(value: any, parentKey?: string): any {
    if (Array.isArray(value)) {
      return value.map((item) => this.transformValue(item, parentKey))
    } else if (value && typeof value === 'object') {
      const result: any = {}
      for (const prop in value) {
        if (parentKey) {
          const compositeMethod = 'get' + upperFirst(parentKey) + upperFirst(camelCase(prop))
          if (typeof (this as any)[compositeMethod] === 'function') {
            result[prop] = (this as any)[compositeMethod](value[prop])
            continue
          }
        }
        const standardMethod = 'get' + upperFirst(camelCase(prop))
        if (typeof (this as any)[standardMethod] === 'function') {
          result[prop] = (this as any)[standardMethod](value[prop])
        } else {
          result[prop] = this.transformValue(value[prop])
        }
      }
      return result
    }
    return value
  }

  public buildPayload(): RequestBody {
    const payload = {} as RequestBody
    for (const key in this.state) {
      const getterName = 'get' + upperFirst(camelCase(key))
      const typedKey = key as unknown as keyof RequestBody
      if (typeof (this as any)[getterName] === 'function') {
        payload[typedKey] = (this as any)[getterName](this.state[key])
      } else {
        payload[typedKey] = this.transformValue(this.state[key], key)
      }

    }
    return payload
  }

  public reset(): void {
    const driver = this.getPersistenceDriver(this.options?.persistSuffix)
    for (const key in this.state) {
      if (Array.isArray(this.original[key])) {
        this.state[key] = cloneDeep(this.original[key]);

        (this.dirty as any)[key] = (this.original[key] as any[]).map((item) => {
          if (item && typeof item === 'object') {
            const initialDirty: Record<string, boolean> = {}
            for (const k in item) {
              if (Object.prototype.hasOwnProperty.call(item, k)) {
                initialDirty[k] = false
              }
            }
            return initialDirty
          }

          return false
        })
      } else {
        this.state[key] = cloneDeep(this.original[key])
        this.dirty[key as keyof FormBody] = false
      }
    }
    for (const key in this._errors) {
      delete this._errors[key]
    }
    for (const key in this._suggestions) {
      delete this._suggestions[key]
    }
    driver.set(this.constructor.name, {
      state: toRaw(this.state),
      original: toRaw(this.original),
      dirty: toRaw(this.dirty)
    } as PersistedForm<FormBody>)
  }

  public addToArrayProperty(property: keyof FormBody, newElement: any): void {
    const driver = this.getPersistenceDriver(this.options?.persistSuffix)
    const arr = this.state[property]
    if (!Array.isArray(arr)) {
      throw new Error(`Property "${String(property)}" is not an array.`)
    }
    arr.push(newElement)
    if (!this._errors[property]) {
      this._errors[property] = reactive([])
    }
    if (!this._suggestions[property]) {
      this._suggestions[property] = reactive([])
    }
    if (newElement && typeof newElement === 'object') {
      this._errors[property].push({})
      this._suggestions[property].push({})
    } else {
      this._errors[property].push([])
      this._suggestions[property].push([])
    }
    if (newElement && typeof newElement === 'object') {
      const initialDirty: Record<string, boolean> = {}
      for (const k in newElement) {
        if (Object.prototype.hasOwnProperty.call(newElement, k)) {
          initialDirty[k] = false
        }
      }
      (this.dirty[property] as any[]).push(initialDirty)
    } else {
      (this.dirty[property] as boolean[]).push(false)
    }
    driver.set(this.constructor.name, {
      state: toRaw(this.state),
      original: toRaw(this.original),
      dirty: toRaw(this.dirty)
    } as PersistedForm<FormBody>)
  }

  public get properties(): { [K in keyof FormBody]: any } {
    const props: any = {}
    for (const key in this.state) {
      const value = this.state[key]
      if (Array.isArray(value)) {
        props[key] = value.map((item, index) => {
          const elementProps: any = {}
          if (item && typeof item === 'object') {
            for (const innerKey in item) {
              elementProps[innerKey] = {
                model: computed({
                  get: () => ((this.state[key] as unknown as any[])[index] as any)[innerKey],
                  set: (newVal) => {
                    ((this.state[key] as unknown) as any[])[index][innerKey] = newVal
                    const updatedElement = ((this.state[key] as unknown) as any[])[index]
                    const originalElement = ((this.original[key] as unknown) as any[])[index];
                    ((this.dirty[key] as any[]))[index] = this.computeDirtyState(updatedElement, originalElement)
                  },
                }),
                errors: (this._errors[key] && this._errors[key][index] && this._errors[key][index][innerKey]) || [],
                suggestions: (this._suggestions[key] && this._suggestions[key][index] && this._suggestions[key][index][innerKey]) || [],
                dirty: (
                  Array.isArray(this.dirty[key]) &&
                  this.dirty[key][index] &&
                  typeof (this.dirty[key] as any[])[index] === 'object'
                    ? (this.dirty[key] as any[])[index][innerKey]
                    : false
                ),
              }
            }
          } else {
            elementProps.value = {
              model: computed({
                get: () => ((this.state[key] as unknown) as any[])[index],
                set: (newVal) => {
                  ((this.state[key] as unknown) as any[])[index] = newVal
                  const updatedValue = ((this.state[key] as unknown) as any[])[index]
                  const originalValue = ((this.original[key] as unknown) as any[])[index];
                  (this.dirty[key] as boolean[])[index] = !isEqual(updatedValue, originalValue)
                },
              }),
              errors: (this._errors[key] && this._errors[key][index]) || [],
              suggestions: (this._suggestions[key] && this._suggestions[key][index]) || [],
              dirty: Array.isArray(this.dirty[key])
                ? (this.dirty[key] as boolean[])[index]
                : false,
            }
          }
          return elementProps
        })
      } else {
        props[key] = {
          model: this._model[key],
          errors: this._errors[key] || [],
          suggestions: this._suggestions[key] || [],
          dirty: this.dirty[key] || false,
        }
      }
    }
    return props
  }

  public isDirty(): boolean {
    const checkDirty = (value: any): boolean => {
      if (typeof value === 'boolean') {
        return value
      }
      if (Array.isArray(value)) {
        return value.some((item) => checkDirty(item))
      }
      if (value && typeof value === 'object') {
        return Object.values(value).some((v) => checkDirty(v))
      }
      return false
    }
    return Object.values(this.dirty).some((v) => checkDirty(v))
  }
}
