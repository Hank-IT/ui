import { type PersistenceDriver } from '../types/PersistenceDriver'
import { type PersistedForm } from '../types/PersistedForm'

export class SessionStorageDriver implements PersistenceDriver {
  public constructor(protected suffix?: string) {}

  private storageKey(key: string): string {
    return this.suffix ? `form_${key}_${this.suffix}` : `form_${key}`
  }

  get<T>(key: string): PersistedForm<T> | null {
    const data = sessionStorage.getItem(this.storageKey(key))

    return data ? JSON.parse(data) : null
  }
  set<T>(key: string, form: PersistedForm<T>): void {
    sessionStorage.setItem(this.storageKey(key), JSON.stringify(form))
  }

  remove(key: string): void {
    sessionStorage.removeItem(this.storageKey(key))
  }
}
