import { type PersistenceDriver } from '../types/PersistenceDriver'
import { type PersistedForm } from '../types/PersistedForm'

export class LocalStorageDriver implements PersistenceDriver {
  private storageKey(key: string): string {
    return `form_${key}`;
  }
  get<T>(key: string): PersistedForm<T> | null {
    const data = localStorage.getItem(this.storageKey(key));
    return data ? JSON.parse(data) : null;
  }
  set<T>(key: string, form: PersistedForm<T>): void {
    localStorage.setItem(this.storageKey(key), JSON.stringify(form));
  }
}