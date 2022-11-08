import { PagingBase } from "./paging-base";

export class FilterUser extends PagingBase {
  fullName: string = '';
  email: string = '';
  role: string = '';
  status: string = '';
  created_from: string = '';
  created_to: string = '';
  sort_name: string = '';
  sort_type: string = '';
}
