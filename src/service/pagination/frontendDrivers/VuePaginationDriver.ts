import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'

export default class VuePaginationDriver {
  protected dataRef: Ref<object[]>
  protected currentPageRef: Ref<number>
  protected pageSizeRef: Ref<number>
  protected totalRef: Ref<number>
  protected totalPagesComputed: ComputedRef<number>
  protected pagesComputed: ComputedRef<number[]>

  public constructor(pageNumber, pageSize) {
    this.dataRef = ref<object[]>([])
    this.currentPageRef = ref<number>(pageNumber)
    this.pageSizeRef = ref<number>(pageSize)
    this.totalRef = ref<number>(0)

    this.totalPagesComputed = computed(() => Math.ceil(this.totalRef.value / this.pageSizeRef.value))
    this.pagesComputed = computed(() => Array.from({ length: this.totalPagesComputed.value }, (_, i) => i + 1))
  }

  public setData(data: object[]): void {
    this.dataRef.value = data
  }

  public setTotal(value: number): void {
    this.totalRef.value = value
  }

  public getData(): object[] {
    return this.dataRef.value
  }

  public getCurrentPage(): number {
    return this.currentPageRef.value
  }

  public setPage(value: number): void {
    this.currentPageRef.value = value
  }

  public setPageSize(value: number): void {
    this.pageSizeRef.value = value
  }

  public getPageSize(): number {
    return this.pageSizeRef.value
  }

  public getLastPage(): number {
    return this.totalPagesComputed.value
  }

  public getPages(): number[] {
    return this.pagesComputed.value
  }

  public getTotal(): number {
    return this.totalRef.value
  }

  public updateItem(
      matcher: (value: object, index: number) => boolean,
      updater: (value: object) => object,
  ): void {
    const index = this.dataRef.value.findIndex(matcher)

    if (index === -1) return

    updater(this.dataRef.value[index])
  }
}