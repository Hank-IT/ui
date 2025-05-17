import { type PersistedForm } from './PersistedForm'

export interface PersistenceDriver {
  get<T>(key: string): PersistedForm<T> | null
  set<T>(key: string, form: PersistedForm<T>): void
  remove(key: string): void
}
