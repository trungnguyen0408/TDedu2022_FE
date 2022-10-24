import { SortColumn } from "../enums/sort-column";

export interface SortFilter {
  sortColumn: SortColumn,
  isDescendingSort: boolean,
}
