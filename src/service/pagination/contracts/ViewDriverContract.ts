export default interface ViewDriverContract {
    setData(data: object[]): void
    setTotal(value: number): void

    getData(): object[]
    getCurrentPage(): number
    setPage(value: number): void
    setPageSize(value: number): void
    getPageSize(): number
    getLastPage(): number
    getPages(): number[]
    getTotal(): number
    updateItem(matcher: (value: object, index: number) => boolean, updater: (value: object) => object): void
}
