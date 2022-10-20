import { SortColumn } from "../enums/sort-column";
import { PagingBase } from "./paging-base";

export interface FilterUser extends PagingBase {
  keyWork: string;
  sortColumn: SortColumn,
  isDescendingSort?: boolean,
}
