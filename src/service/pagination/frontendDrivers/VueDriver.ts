import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'

export class VueDriver {
  protected data: Ref<array>
  protected internalCurrentPageRef: Ref<number>
  protected internalPageSizeRef: Ref<number>
  protected total: Ref<number>

  public constructor(currentPage, pageSize) {
    this.data = ref([])
    this.internalCurrentPageRef = ref(currentPage)
    this.internalPageSizeRef = ref(pageSize)
    this.total = ref(0)
  }

  public start(dataDriver): ComputedRef<number> {
    return computed(() => {
      return dataDriver.start(this.currentPageRaw(), this.pageSizeRaw())
    })
  }

  public end(dataDriver): ComputedRef<number> {
    return computed(() => {
      return dataDriver.end(this.currentPageRaw(), this.pageSizeRaw(), this.totalRaw())
    })
  }

  public totalPages(dataDriver): ComputedRef<number> {
    return computed(() => this.totalPagesRaw(dataDriver))
  }

  public getPageData(): object {
    return this.data
  }

  public setPageData(data): void {
    this.data.value = data
  }

  public setTotal(total): void {
    this.total.value = total
  }

  public getTotal(): Ref<number> {
    return this.total
  }

  public currentPage(dataDriver): ComputedRef<number> {
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

  public pageSize(dataDriver): ComputedRef<number> {
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

  public currentPageRaw(): number {
    return this.internalCurrentPageRef.value
  }

  public pageSizeRaw(): number {
    return this.internalPageSizeRef.value
  }

  public totalRaw(): number {
    return this.total.value
  }

  public totalPagesRaw(dataDriver): number {
    return dataDriver.totalPages(this.pageSizeRaw(), this.totalRaw())
  }

  public pages(dataDriver): ComputedRef<array> {
    return computed(() => dataDriver.pages(this.totalPagesRaw(dataDriver), this.currentPageRaw()))
  }
}