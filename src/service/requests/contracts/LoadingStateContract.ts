export default interface LoadingStateContract {
  isLoading(): Boolean

  setLoading(value: Boolean): void
}