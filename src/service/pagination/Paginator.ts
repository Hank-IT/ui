import ViewDriverFactoryContract from './contracts/ViewDriverFactoryContract'
import PaginationDataDto from './dtos/PaginationDataDto'
import ViewDriverContract from './contracts/ViewDriverContract'

export default class Paginator {
  protected static viewDriverFactory: ViewDriverFactoryContract

  protected viewDriver: ViewDriverContract

  public static setViewDriverFactory(value: ViewDriverFactoryContract): void {
    Paginator.viewDriverFactory = value
  }

  public constructor(
    dataDriver,
    pageNumber: number = 1,
    pageSize: number = 10,
  ) {
    this.dataDriver = dataDriver

    this.viewDriver = Paginator.viewDriverFactory.make(pageNumber, pageSize)
  }

  public init(pageNumber: number = undefined, pageSize: number = undefined): Promise {
    if (pageNumber && pageSize) {
      return this.loadData(pageNumber, pageSize)
    }

    return this.loadData(this.getCurrentPage(), this.getPageSize())
  }

  public refresh(page: number = undefined, clear: boolean = true): void {
    if (page) {
      this.setPage(1)
      return
    }

    this.loadData(this.getCurrentPage(), this.getPageSize(), clear)
  }

  public setPage(pageNumber: number): void {
    if (pageNumber <= 0 || pageNumber > this.getPages().length) {
      return
    }

    this.viewDriver.setPage(pageNumber)
    return this.loadData(this.viewDriver.getCurrentPage(), this.viewDriver.getPageSize())
  }

  public getLastPage(): number {
    return this.viewDriver.getLastPage()
  }

  public toNextPage(): void {
    this.setPage(this.getCurrentPage() + 1)
  }

  public toFirstPage(): void {
    this.setPage(1)
  }

  public toLastPage(): void {
    this.setPage(this.viewDriver.getLastPage())
  }

  public toPreviousPage(): void {
    this.setPage(this.getCurrentPage() - 1)
  }

  public getPageData(): object[] {
    return this.viewDriver.getData()
  }

  public getCurrentPage(): number {
    return this.viewDriver.getCurrentPage()
  }

  public getFromItemNumber(): number {
    return (this.getCurrentPage() - 1) * this.getPageSize() + 1
  }

  public getToItemNumber(): number {
    return this.getCurrentPage() * this.getPageSize()
  }

  public getTotal(): number {
    return this.viewDriver.getTotal()
  }

  public getPageSize(): number {
    return this.viewDriver.getPageSize()
  }

  public setPageSize(pageSize: number): void {
    this.viewDriver.setPageSize(pageSize)

    if (this.getCurrentPage() * pageSize > this.getTotal()) {
      this.setPage(1)

      return
    }

    return this.loadData(this.viewDriver.getCurrentPage(), this.viewDriver.getPageSize())
  }

  public getPages(): number[] {
    return this.viewDriver.getPages()
  }

  protected loadData(pageNumber: number, pageSize: number, clear: boolean = true): void {
    if (clear) {
      this.viewDriver.setData([])
    }

    return this.dataDriver.get(pageNumber, pageSize)
        .then((dto: PaginationDataDto) => {
          this.viewDriver.setData(dto.getData())
          this.viewDriver.setTotal(dto.getTotal())
        })
  }

  /**
   * @param matcher find the object in the data array
   * @param updater must return the changed object
   */
  public updateItem(
      matcher: (value: object, index: number) => boolean,
      updater: (value: object) => object,
  ): void {
    return this.viewDriver.updateItem(matcher, updater)
  }
}