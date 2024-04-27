import PaginationDataDto from '../dtos/PaginationDataDto'

export default abstract class BaseDriver {
  public abstract get(pageNumber: number, pageSize: number): Promise<PaginationDataDto>
}