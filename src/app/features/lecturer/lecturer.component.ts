import { SelectionModel } from '@angular/cdk/collections';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { BaseComponent } from 'src/app/core/components/base.component';
import { APP_MESSAGE } from 'src/app/core/constants/app-message-constant';
import { UserStatus } from 'src/app/core/constants/user-status-constant';
import { ActionType } from 'src/app/core/enums/action-type';
import { SortColumn } from 'src/app/core/enums/sort-column';
import { FilterUser } from 'src/app/core/models/filter-user';
import { SortFilter } from 'src/app/core/models/sort-filter';
import { PreviewPageComponent } from '../preview-page/preview-page.component';
import { AddOrEditUserOfLecturerComponent } from './add-or-edit-user-of-lecturer/add-or-edit-user-of-lecturer.component';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})
export class LecturerComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'email', 'role', 'createAt', 'status', 'preview', 'edit'];
  dataSource = new MatTableDataSource<any>();
  form: FormGroup;
  fullName: string = '';
  email: string = '';
  status: string = '';
  createAtFrom?: Date;
  createAtTo?: Date;
  skip: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;
  totalData: number = 0;
  selectionUser = new SelectionModel<any>(true, []);
  sortFilter: SortFilter = {
    sortColumn: SortColumn.none,
    isDescendingSort: true
  };
  listStatus = UserStatus.Status;
  defaultItem: { text: string, value: string } = { text: 'All', value: '' };

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

  constructor(injector: Injector, private dialog: MatDialog) {
    super(injector);
    this.form = new FormGroup({
      fullName: new FormControl(this.fullName),
      email: new FormControl(this.email),
      status: new FormControl(this.status),
      createAtFrom: new FormControl(this.createAtFrom),
      createAtTo: new FormControl(this.createAtTo)
    });
  }

  ngOnInit(): void {
    this.dataSource.data = this.dataTest;
    this.totalData = this.dataTest.length;
  }

  getSortColum() {
    return SortColumn;
  }

  onSearch() {
    this.handleGetUser();
  }

  handleGetUser() {
    if (this.isUserInputSubmittedDate()) {
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
    filter.created_from = this.formatDate(this.getFormValue('createAtFrom'));
    filter.created_to = this.formatDate(this.getFormValue('createAtTo'));
    filter.limit = this.pageIndex;
    filter.page = this.pageSize;
    filter.sort_name = this.sortFilter.sortColumn;
    filter.sort_by = this.sortFilter.isDescendingSort;

    this.getUserByFilter(filter);
  }

  getFormValue(name: string) {
    return this.form.get(name)?.value ?? '';
  }

  getUserByFilter(filter: FilterUser) {
    //call api get by filter
    this.showLoader();
    setTimeout(() => {

      this.showLoader(false);
    }, 2000);
  }

  onSortColumn(sortField: SortColumn) {
    if (this.sortFilter.sortColumn != sortField) {
      this.sortFilter.sortColumn = sortField;
      this.sortFilter.isDescendingSort = false;
    } else {
      this.switchSortDirection();
    }
  }

  isUserInputSubmittedDate(): boolean {
    return this.createAtFrom != null || this.createAtTo != null ? true : false;
  }

  switchSortDirection() {
    this.sortFilter.isDescendingSort = this.sortFilter.isDescendingSort ? false : true;
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
    this.dialog.open(AddOrEditUserOfLecturerComponent, {
      data: ActionType.edit
    })
  }

  onCreate() {
    this.dialog.open(AddOrEditUserOfLecturerComponent, {
      data: ActionType.add
    })
  }
}
