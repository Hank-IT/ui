import { computed, ref } from 'vue'

export class VueDriver {
  public constructor(currentPage, pageSize) {
    this.data = ref([])
    this.internalCurrentPageRef = ref(currentPage)
    this.internalPageSizeRef = ref(pageSize)
    this.total = ref(0)
  }

  public start(dataDriver) {
    return computed(() => {
      return dataDriver.start(this.currentPageRaw(), this.pageSizeRaw())
    })
  }

  public end(dataDriver) {
    return computed(() => {
      return dataDriver.end(this.currentPageRaw(), this.pageSizeRaw(), this.totalRaw())
    })
  }

  public totalPages(dataDriver) {
    return computed(() => this.totalPagesRaw(dataDriver))
  }

  public getPageData() {
    return this.data
  }

  public setPageData(data) {
    this.data.value = data
  }

  public setTotal(total) {
    this.total.value = total
  }

  public getTotal() {
    return this.total
  }

  public currentPage(dataDriver) {
    return computed({
      get: () => this.internalCurrentPageRef.value,
      set: (value) => {
        // Prevent page count from going out of range
        if (value <= 0 || value > this.totalPages(dataDriver).value) {
          return
        }

        this.internalCurrentPageRef.value = value

        dataDriver.get(this.currentPageRaw(), this.pageSizeRaw()).then(dto => {
          this.setPageData(dto.getData())
          this.setTotal(dto.getTotal())
        })
      }
    })
  }

  public pageSize(dataDriver) {
    return computed({
      get: () => this.internalPageSizeRef.value,
      set: (value) => {
        this.internalPageSizeRef.value = value

        dataDriver.get(this.currentPageRaw(), this.pageSizeRaw()).then(dto => {
          this.setPageData(dto.getData())
          this.setTotal(dto.getTotal())
        })
      }
    })
  }

  public currentPageRaw() {
    return this.internalCurrentPageRef.value
  }

  public pageSizeRaw() {
    return this.internalPageSizeRef.value
  }

  public totalRaw() {
    return this.total.value
  }

  public totalPagesRaw(dataDriver) {
    return dataDriver.totalPages(this.pageSizeRaw(), this.totalRaw())
  }

  public pages(dataDriver) {
    return computed(() => dataDriver.pages(this.totalPagesRaw(dataDriver), this.currentPageRaw()))
  }
}