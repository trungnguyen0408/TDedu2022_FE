import { SortColumn } from "../enums/sort-column";
import { PagingBase } from "./paging-base";

export class FilterUser extends PagingBase {
  fullName: string = '';
  email: string = '';
  role: string = '';
  status: string = '';
  createAtFrom: string = '';
  createAtTo: string = '';
  sortColumn: SortColumn = SortColumn.none;
  isDescendingSort: boolean = true;
}
