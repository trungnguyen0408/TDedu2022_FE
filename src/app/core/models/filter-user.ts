import { SortColumn } from "../enums/sort-column";
import { PagingBase } from "./paging-base";

export interface FilterUser extends PagingBase {
  fullName: string,
  email: string,
  role: string,
  status: string,
  createAtFrom: Date,
  createAtTo: Date
  sortColumn: SortColumn,
  isDescendingSort?: boolean,
}
