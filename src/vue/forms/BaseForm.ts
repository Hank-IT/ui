import { reactive, computed, toRaw, type ComputedRef, watch } from 'vue'
import { camelCase, upperFirst, cloneDeep, isEqual } from 'lodash-es'
import isEqualWith from 'lodash-es/isEqualWith'
import { type PersistedForm } from './types/PersistedForm'
import { NonPersistentDriver } from './drivers/NonPersistentDriver'
import { type PersistenceDriver } from './types/PersistenceDriver'
import { PropertyAwareArray } from './PropertyAwareArray'

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
 * Helper: Given the defaults and a state object (or original),
 * for every key where the default is a PropertyAwareArray, rewrap the value if needed.
 */
function restorePropertyAwareArrays<FormBody>(defaults: FormBody, state: FormBody): void {
  for (const key in defaults) {
    const defVal = defaults[key]
    if (defVal instanceof PropertyAwareArray) {
      // If state[key] is not an instance, assume it’s a plain object and rewrap it.
      if (!(state[key] instanceof PropertyAwareArray)) {
        state[key] = new PropertyAwareArray((state[key] as any)?.items || (state[key] as any)) as any
      }
    }
  }
}

function propertyAwareDeepEqual(a: any, b: any): boolean {
  // A helper that returns the "inner" value if it looks like a PropertyAwareArray.
  const getInner = (val: any) => {
    // If val is an instance of PropertyAwareArray, use its .items.
    if (val instanceof PropertyAwareArray) {
      return val.items
    }
    // Otherwise, if it's a plain object that has an 'items' property that's an array,
    // assume it was meant to be a PropertyAwareArray.
    if (val && typeof val === 'object' && Array.isArray(val.items)) {
      return val.items
    }
    return val
  }

  return isEqualWith(a, b, (aValue, bValue) => {
    const normA = getInner(aValue)
    const normB = getInner(bValue)
    // If either normalization changed the value, compare the normalized ones.
    if (normA !== aValue || normB !== bValue) {
      return isEqual(normA, normB)
    }
    return undefined  // use default comparison
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
  FormBody extends object
> {
  public readonly state: FormBody
  private readonly dirty: Record<keyof FormBody, boolean | any[]>
  private readonly original: FormBody
  private readonly _model: { [K in keyof FormBody]: ComputedRef<FormBody[K]> }
  private _errors: any = reactive({})
  private _suggestions: any = reactive({})
  protected append: string[] = []
  protected ignore: string[] = []
  protected errorMap: { [serverKey: string]: string | string[] } = {}
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
   * For plain arrays we compare the entire array (a single flag), not each element.
   */
  private computeDirtyState(current: any, original: any): any {
    if (Array.isArray(current) && Array.isArray(original)) {
      return current.length !== original.length || !isEqual(current, original)
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
    const persist = options?.persist !== false;
    let initialData: FormBody;
    const driver = this.getPersistenceDriver(options?.persistSuffix);

    if (persist) {
      const persisted = driver.get<FormBody>(this.constructor.name);
      if (persisted && propertyAwareDeepEqual(defaults, persisted.original)) {
        initialData = persisted.state;
        this.original = cloneDeep(persisted.original);
        this.dirty = reactive(persisted.dirty) as Record<keyof FormBody, boolean | any[]>;
        // Rewrap persisted values that were originally PropertyAwareArrays:
        restorePropertyAwareArrays(defaults, initialData);
        restorePropertyAwareArrays(defaults, this.original);
      } else {
        console.log("Discarding persisted data for " + this.constructor.name + " because it doesn't match the defaults.");
        initialData = defaults;
        this.original = cloneDeep(defaults);
        const initDirty: Partial<Record<keyof FormBody, boolean | any[]>> = {};
        for (const key in defaults) {
          const value = defaults[key];
          if (value instanceof PropertyAwareArray) {
            initDirty[key as keyof FormBody] = (value.items as any[]).map(item => {
              if (item && typeof item === 'object') {
                const obj: Record<string, boolean> = {};
                for (const k in item) {
                  if (Object.prototype.hasOwnProperty.call(item, k)) {
                    obj[k] = false;
                  }
                }
                return obj;
              }
              return false;
            });
          } else {
            initDirty[key as keyof FormBody] = false
          }
        }
        this.dirty = reactive(initDirty) as Record<keyof FormBody, boolean | any[]>;
        driver.remove(this.constructor.name);
      }
    } else {
      initialData = defaults;
      this.original = cloneDeep(defaults);
      const initDirty: Partial<Record<keyof FormBody, boolean | any[]>> = {};
      for (const key in defaults) {
        const value = defaults[key];
        if (value instanceof PropertyAwareArray) {
          initDirty[key as keyof FormBody] = (value.items as any[]).map(item => {
            if (item && typeof item === 'object') {
              const obj: Record<string, boolean> = {};
              for (const k in item) {
                if (Object.prototype.hasOwnProperty.call(item, k)) {
                  obj[k] = false;
                }
              }
              return obj;
            }
            return false;
          });
        } else {
          initDirty[key as keyof FormBody] = false
        }
      }
      this.dirty = reactive(initDirty) as Record<keyof FormBody, boolean | any[]>;
    }

    this.state = reactive(initialData) as FormBody;
    this._model = {} as { [K in keyof FormBody]: ComputedRef<FormBody[K]> };

    // Create computed models.
    for (const key in this.state) {
      const value = this.state[key];
      if (value instanceof PropertyAwareArray) {
        // @ts-expect-error
        this._model[key as keyof FormBody] = computed({
          get: () => (this.state[key] as PropertyAwareArray).items,
          set: (newVal: any) => {
            (this.state[key] as PropertyAwareArray).items = newVal;
            this.dirty[key as keyof FormBody] = (newVal as any[]).map(() => false);
            if (persist) {
              driver.set(this.constructor.name, {
                state: toRaw(this.state),
                original: toRaw(this.original),
                dirty: toRaw(this.dirty)
              } as PersistedForm<FormBody>);
            }
          }
        });
      } else {
        this._model[key as keyof FormBody] = computed({
          get: () => this.state[key],
          set: (value: FormBody[typeof key]) => {
            this.state[key] = value;
            this.dirty[key as keyof FormBody] = this.computeDirtyState(value, this.original[key]);
            if (persist) {
              driver.set(this.constructor.name, {
                state: toRaw(this.state),
                original: toRaw(this.original),
                dirty: toRaw(this.dirty)
              } as PersistedForm<FormBody>);
            }
          }
        });
      }
    }

    // Add a deep watch for plain arrays to update the dirty state if in-place changes occur.
    for (const key in this.state) {
      const value = this.state[key];
      if (Array.isArray(value) && !(value instanceof PropertyAwareArray)) {
        watch(
          () => this.state[key],
          (newVal) => {
            this.dirty[key as keyof FormBody] = this.computeDirtyState(newVal, this.original[key]);
          },
          { deep: true }
        );
      }
    }

    if (persist) {
      watch(
        () => this.state,
        () => {
          driver.set(this.constructor.name, {
            state: toRaw(this.state),
            original: toRaw(this.original),
            dirty: toRaw(this.dirty)
          } as PersistedForm<FormBody>);
        },
        { deep: true, immediate: true }
      );
    }
  }

  public fillErrors<ErrorInterface>(errorsData: ErrorInterface): void {
    for (const key in this._errors) {
      delete this._errors[key]
    }

    for (const serverKey in errorsData) {
      if (Object.prototype.hasOwnProperty.call(errorsData, serverKey)) {
        const errorMessage = errorsData[serverKey];

        let targetKeys: string[] = [serverKey];

        const mapping = this.errorMap?.[serverKey];
        if (mapping) {
          targetKeys = Array.isArray(mapping) ? mapping : [mapping];
        }

        for (const targetKey of targetKeys) {
          const parts = targetKey.split('.');
          if (parts.length > 1) {
            const topKey = parts[0];
            // @ts-ignore index could be NaN if part is not a number
            const index = parseInt(parts[1], 10);
            const errorSubKey = parts.slice(2).join('.');

            // @ts-ignore Dynamic property access
            if (!this._errors[topKey]) {
              // @ts-ignore Dynamic property access
              this._errors[topKey] = [];
            }
            // @ts-ignore Dynamic property access, index could be NaN
            if (!this._errors[topKey][index]) {
              // @ts-ignore Dynamic property access, index could be NaN
              this._errors[topKey][index] = {};
            }

            // @ts-ignore Dynamic property access, index could be NaN
            this._errors[topKey][index][errorSubKey] = errorMessage;

          } else {
            // @ts-ignore Dynamic property access
            this._errors[targetKey] = errorMessage;
          }
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
        if (currentVal instanceof PropertyAwareArray) {
          if (Array.isArray(newVal)) {
            (this.state[key] as PropertyAwareArray).items = newVal
          } else if (newVal instanceof PropertyAwareArray) {
            (this.state[key] as PropertyAwareArray).items = newVal.items
          }
          this.dirty[key as keyof FormBody] = ((this.state[key] as PropertyAwareArray).items as any[]).map(() => false)
        } else if (Array.isArray(newVal) && Array.isArray(currentVal)) {
          if (newVal.length === currentVal.length) {
            this.state[key] = deepMergeArrays(currentVal, newVal) as any
          } else {
            this.state[key] = newVal as any
          }
          this.dirty[key as keyof FormBody] = this.computeDirtyState(this.state[key], this.original[key])
        } else if (newVal && typeof newVal === 'object' && currentVal && typeof currentVal === 'object') {
          this.state[key] = shallowMerge({ ...currentVal }, newVal)
          this.dirty[key as keyof FormBody] = this.computeDirtyState(this.state[key], this.original[key])
        } else {
          this.state[key] = newVal as any
          this.dirty[key as keyof FormBody] = this.computeDirtyState(this.state[key], this.original[key])
        }
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
    if (value instanceof PropertyAwareArray) {
      return (value as PropertyAwareArray).items.map(item => this.transformValue(item, parentKey));
    }
    if (Array.isArray(value)) {
      // For plain arrays, you might want to map them too:
      return value.map(item => this.transformValue(item, parentKey));
    } else if (value && typeof value === 'object') {
      const result: any = {};
      for (const prop in value) {
        if (parentKey) {
          const compositeMethod = 'get' + upperFirst(parentKey) + upperFirst(camelCase(prop));
          if (typeof (this as any)[compositeMethod] === 'function') {
            result[prop] = (this as any)[compositeMethod](value[prop]);
            continue;
          }
        }
        // Pass the parentKey along so that nested objects still use it.
        result[prop] = this.transformValue(value[prop], parentKey);
      }
      return result;
    }
    return value;
  }

  public buildPayload(): RequestBody {
    const payload = {} as RequestBody
    for (const key in this.state) {
      if (this.ignore.includes(key)) {
        continue;
      }

      let value = this.state[key];
      if (value instanceof PropertyAwareArray) {
        // @ts-expect-error Type mismatch due to generic nature
        value = (value as PropertyAwareArray<unknown>).items;
      }
      const getterName = 'get' + upperFirst(camelCase(key));
      const typedKey = key as unknown as keyof RequestBody;
      if (typeof (this as any)[getterName] === 'function') {
        payload[typedKey] = (this as any)[getterName](value);
      } else {
        payload[typedKey] = this.transformValue(value, key);
      }
    }

    for (const fieldName of this.append) {
      if (Array.isArray(this.ignore) && this.ignore.includes(fieldName)) {
        console.warn(`Appended field '${fieldName}' is also in ignore list in ${this.constructor.name}. It will be skipped.`);
        continue;
      }

      const getterName = 'get' + upperFirst(camelCase(fieldName));
      if (typeof (this as any)[getterName] === 'function') {
        payload[fieldName as keyof RequestBody] = (this as any)[getterName]();
      } else {
        console.warn(`Getter method '${getterName}' not found for appended field '${fieldName}' in ${this.constructor.name}.`);
      }
    }

    return payload
  }

  public reset(): void {
    const driver = this.getPersistenceDriver(this.options?.persistSuffix)
    for (const key in this.state) {
      if (this.state[key] instanceof PropertyAwareArray) {
        const originalValue = this.original[key] as PropertyAwareArray
        (this.state[key] as PropertyAwareArray).items = cloneDeep(originalValue.items)
        this.dirty[key as keyof FormBody] = ((this.state[key] as PropertyAwareArray).items as any[]).map(() => false)
      } else if (Array.isArray(this.original[key])) {
        this.state[key] = cloneDeep(this.original[key])
        this.dirty[key as keyof FormBody] = this.computeDirtyState(this.state[key], this.original[key])
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

  protected addToArrayProperty(property: keyof FormBody, newElement: any): void {
    const driver = this.getPersistenceDriver(this.options?.persistSuffix)
    const arr = this.state[property]
    if (arr instanceof PropertyAwareArray) {
      (arr as PropertyAwareArray).items.push(newElement)
      driver.set(this.constructor.name, {
        state: toRaw(this.state),
        original: toRaw(this.original),
        dirty: toRaw(this.dirty)
      } as PersistedForm<FormBody>)
      return
    }
    if (!Array.isArray(arr)) {
      throw new Error(`Property "${String(property)}" is not an array.`)
    }
    arr.push(newElement)
    this.dirty[property] = this.computeDirtyState(arr, this.original[property])
    driver.set(this.constructor.name, {
      state: toRaw(this.state),
      original: toRaw(this.original),
      dirty: toRaw(this.dirty)
    } as PersistedForm<FormBody>)
  }

  protected removeArrayItem(arrayIndex: string, filter: (item: any) => boolean): void {
    // @ts-expect-error
    const current = this.state[arrayIndex]
    if (current instanceof PropertyAwareArray) {
      (current as PropertyAwareArray).items = (current as PropertyAwareArray).items.filter(filter)
    } else if (Array.isArray(current)) {
      // @ts-expect-error
      this.state[arrayIndex] = current.filter(filter)
    }
  }

  protected resetArrayCounter(arrayIndex: string, counterIndex: string): void {
    let count = 1
    // @ts-expect-error
    const current = this.state[arrayIndex]
    if (current instanceof PropertyAwareArray) {
      (current as PropertyAwareArray).items.forEach((item: any): void => {
        item[counterIndex] = count
        count++
      })
    } else if (Array.isArray(current)) {
      current.forEach((item: any): void => {
        item[counterIndex] = count
        count++
      })
    }
  }

  public get properties(): { [K in keyof FormBody]: any } {
    const props: any = {}
    for (const key in this.state) {
      const value = this.state[key]
      if (value instanceof PropertyAwareArray) {
        props[key] = (value as PropertyAwareArray).items.map((item, index) => {
          const elementProps: any = {}
          if (item && typeof item === 'object') {
            for (const innerKey in item) {
              elementProps[innerKey] = {
                model: computed({
                  get: () =>
                    ((this.state[key] as PropertyAwareArray).items[index] as any)[innerKey],
                  set: (newVal) => {
                    ((this.state[key] as PropertyAwareArray).items[index] as any)[innerKey] = newVal
                    const updatedElement = ((this.state[key] as PropertyAwareArray).items[index] as any)
                    const originalElement = ((this.original[key] as PropertyAwareArray).items[index] as any);
                    ((this.dirty[key] as any[]))[index] = this.computeDirtyState(updatedElement, originalElement)
                  }
                }),
                errors: (this._errors[key] && this._errors[key][index] && this._errors[key][index][innerKey]) || [],
                suggestions: (this._suggestions[key] && this._suggestions[key][index] && this._suggestions[key][index][innerKey]) || [],
                dirty:
                  Array.isArray(this.dirty[key]) &&
                  this.dirty[key][index] &&
                  typeof (this.dirty[key] as any[])[index] === 'object'
                    ? (this.dirty[key] as any[])[index][innerKey]
                    : false
              }
            }
          } else {
            elementProps.value = {
              model: computed({
                get: () => ((this.state[key] as PropertyAwareArray).items[index] as any),
                set: (newVal) => {
                  ((this.state[key] as PropertyAwareArray).items[index] = newVal)
                  const updatedValue = ((this.state[key] as PropertyAwareArray).items[index] as any)
                  const originalValue = ((this.original[key] as PropertyAwareArray).items[index] as any);
                  (this.dirty[key] as boolean[])[index] = !isEqual(updatedValue, originalValue)
                }
              }),
              errors: (this._errors[key] && this._errors[key][index]) || [],
              suggestions: (this._suggestions[key] && this._suggestions[key][index]) || [],
              dirty: Array.isArray(this.dirty[key])
                ? (this.dirty[key] as boolean[])[index]
                : false
            }
          }
          return elementProps
        })
      } else {
        props[key] = {
          model: this._model[key],
          errors: this._errors[key] || [],
          suggestions: this._suggestions[key] || [],
          dirty: this.dirty[key] || false
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
