export default abstract class BaseDriver {
  public start(currentPage, pageSize) {
    return this.calculatedStart(currentPage, pageSize) + 1
  }

  public end(currentPage, pageSize, total) {
    if (this.calculatedEnd(currentPage, pageSize) > total) {
      return total
    }

    return this.calculatedEnd(currentPage, pageSize)
  }

  public totalPages(pageSize, total) {
    return Math.ceil(total / pageSize)
  }

  public pages(pageCount, currentPage) {
    let displayPages = 4 // ToDo

    if (pageCount < displayPages) {
      displayPages = pageCount
    }

    let offset = 0

    const middlePage = Math.ceil(displayPages / 2)

    if (currentPage <= middlePage) {
      offset = 0
    } else if (currentPage > pageCount - middlePage) {
      offset = pageCount - displayPages
    } else {
      offset = currentPage - middlePage
    }

    return [...Array(displayPages).keys()].map(i => i + 1 + offset)
  }

  protected calculatedStart(currentPage, pageSize) {
    return (currentPage - 1) * pageSize
  }

  protected calculatedEnd(currentPage, pageSize) {
    return currentPage * pageSize
  }

  public abstract get(currentPage, pageSize)
}