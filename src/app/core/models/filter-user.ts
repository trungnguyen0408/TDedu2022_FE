import { SortColumn } from "../enums/sort-column";
import { PagingBase } from "./paging-base";

export class FilterUser extends PagingBase {
  fullName: string = '';
  email: string = '';
  role: string = '';
  status: string = '';
  created_from: string = '';
  created_to: string = '';
  sort_name: SortColumn = SortColumn.none;
  sort_by: boolean = true;
}
