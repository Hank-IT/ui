export interface LoadingStateContract {
  isLoading(): boolean

  setLoading(value: boolean): void
}