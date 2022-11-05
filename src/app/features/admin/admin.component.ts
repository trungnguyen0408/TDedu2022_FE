import { SelectionModel } from '@angular/cdk/collections';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { SortColumn } from 'src/app/core/enums/sort-column';
import { SortFilter } from 'src/app/core/models/sort-filter';
import { MatDialog } from '@angular/material/dialog';
import { PreviewPageComponent } from '../preview-page/preview-page.component';
import { UserStatus } from 'src/app/core/constants/user-status-constant';
import { FilterUser } from 'src/app/core/models/filter-user';
import { UserRole } from 'src/app/core/constants/user-role-constant';
import { APP_MESSAGE } from 'src/app/core/constants/app-message-constant';
import { BaseComponent } from 'src/app/core/components/base.component';
import { AddOrEditUserOfAdminComponent } from './add-or-edit-user-of-admin/add-or-edit-user-of-admin.component';
import { ActionType } from 'src/app/core/enums/action-type';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['select', 'fullName', 'email', 'role', 'createAt', 'status', 'preview', 'edit', 'del'];
  dataSource = new MatTableDataSource<any>();
  form: FormGroup;
  fullName: string = '';
  email: string = '';
  status: string = '';
  role: string = '';
  createAtFrom?: Date;
  createAtTo?: Date;
  skip: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;
  totalData: number = 0;
  sortFilter: SortFilter = {
    sortColumn: SortColumn.none,
    isDescendingSort: true,
  };
  selectionUser = new SelectionModel<any>(true, []);
  listStatus = UserStatus.Status;
  defaultItem: { text: string, value: string } = { text: 'All', value: '' };
  listRole = UserRole.Roles;

  dataTest: any[] = [{ fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Lecturer', createAt: '03/02/2020', status: 'Banned' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Lecturer', createAt: '03/02/2020', status: 'Banned' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Student', createAt: '03/02/2020', status: 'Active' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Student', createAt: '03/02/2020', status: 'Banned' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Lecturer', createAt: '03/02/2020', status: 'Inactive' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Lecturer', createAt: '03/02/2020', status: 'Banned' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Student', createAt: '03/02/2020', status: 'Banned' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Student', createAt: '03/02/2020', status: 'Active' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Lecturer', createAt: '03/02/2020', status: 'Banned' },
  { fullName: 'Nguyen Minh Trung', email: 'trung@yodmail.com', role: 'Student', createAt: '03/02/2020', status: 'Inactive' }];

  constructor(injector: Injector, private dialog: MatDialog, private adminService: AdminService) {
    super(injector);
    this.form = new FormGroup({
      fullName: new FormControl(this.fullName),
      email: new FormControl(this.email),
      status: new FormControl(this.status),
      role: new FormControl(this.role),
      createAtFrom: new FormControl(this.createAtFrom),
      createAtTo: new FormControl(this.createAtTo)
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.dataTest;
    this.totalData = this.dataTest.length;
    //this.handleGetUser();
  }

  getSortColum() {
    return SortColumn;
  }

  onSearch() {
    this.handleGetUser();
  }

  onSortColumn(sortField: SortColumn) {
    if (this.sortFilter.sortColumn != sortField) {
      this.sortFilter.sortColumn = sortField;
      this.sortFilter.isDescendingSort = false;
    } else {
      this.switchSortDirection();
    }
  }

  switchSortDirection() {
    this.sortFilter.isDescendingSort = this.sortFilter.isDescendingSort ? false : true;
  }

  onBulkDelete() {
  }

  isAllSelected() {
    const numSelected = this.selectionUser.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selectionUser.clear() :
      this.dataSource.data.forEach(item => this.selectionUser.select(item));
  }

  onPageChange(e: PageChangeEvent) {
    this.skip = e.skip;
    this.pageSize = e.take;
    this.pageIndex = this.skip / this.pageSize;
  }

  onPreview() {
    this.dialog.open(PreviewPageComponent, {
      data: '123'
    })
  }

  onEdit() {
    this.dialog.open(AddOrEditUserOfAdminComponent, {
      data: ActionType.edit
    })
  }

  onCreate() {
    this.dialog.open(AddOrEditUserOfAdminComponent, {
      data: ActionType.add
    })
  }

  handleGetUser() {
    if (this.isUserInputCreateAt()) {
      if (this.createAtFrom == null || this.createAtTo == null) {
        this.alertMessageService.error(APP_MESSAGE.SEARCH_CREATEAT_NOT_INPUT_DATE_RANGE);
        return;
      }

      if (this.createAtFrom.getTime() > this.createAtTo.getTime()) {
        this.alertMessageService.error(APP_MESSAGE.SEARCH_CREATEAT_DATE_FROM_BIGGER_DATE_TO);
        return;
      }
    }

    const filter = new FilterUser();

    filter.fullName = this.getFormValue('fullName');
    filter.email = this.getFormValue('email');
    filter.status = this.getFormValue('status');
    filter.role = this.getFormValue('role');
    filter.created_from = this.formatDate(this.getFormValue('createAtFrom'));
    filter.created_to = this.formatDate(this.getFormValue('createAtTo'));
    filter.limit = this.pageIndex;
    filter.page = this.pageSize;
    filter.sort_name = this.sortFilter.sortColumn;
    filter.sort_by = this.sortFilter.isDescendingSort;

    this.getUserByFilter(filter);
  }

  getUserByFilter(filter: FilterUser) {
    //call api get by filter
    console.log(filter);

    // this.showLoader();
    this.adminService.filterUser(filter).subscribe(data => {
      console.log("data: ", data);
    });
  }

  getFormValue(name: string) {
    return this.form.get(name)?.value ?? '';
  }

  isUserInputCreateAt(): boolean {
    return this.createAtFrom != null || this.createAtTo != null ? true : false;
  }
}
