export default class Paginator {
  public constructor(
    dataDriver,
    frontendDriver,
  ) {
    this.dataDriver = dataDriver

    this.frontendDriver = frontendDriver
  }

  public init() {
    this.dataDriver.get(
      this.frontendDriver.currentPageRaw(), this.frontendDriver.pageSizeRaw()
    ).then(dto => {
      this.frontendDriver.setPageData(dto.getData())
      this.frontendDriver.setTotal(dto.getTotal())
    })
  }

  public currentPageData() {
    return this.frontendDriver.getPageData()
  }

  public start() {
    return this.frontendDriver.start(this.dataDriver)
  }

  public end() {
    return this.frontendDriver.end(this.dataDriver)
  }

  public totalPages() {
    return this.frontendDriver.totalPages(this.dataDriver)
  }

  public total() {
    return this.frontendDriver.getTotal()
  }

  public currentPage() {
    return this.frontendDriver.currentPage(this.dataDriver)
  }

  public pageSize() {
    return this.frontendDriver.pageSize(this.dataDriver)
  }

  public pages() {
    return this.frontendDriver.pages(this.dataDriver)
  }
}