import { type PersistenceDriver } from '../types/PersistenceDriver'
import { type PersistedForm } from '../types/PersistedForm'

/** Default driver: does not persist any data. */
export class NonPersistentDriver implements PersistenceDriver {
  get<T>(key: string): PersistedForm<T> | null {
    return null
  }

  set<T>(key: string, form: PersistedForm<T>): void {
    // no-op
  }
}