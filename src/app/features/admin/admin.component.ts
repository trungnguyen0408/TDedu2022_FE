import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { SortColumn } from 'src/app/core/enums/sort-column';
import { SortFilter } from 'src/app/core/models/sort-filter';
import * as moment from 'moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['select', 'fullName', 'email', 'role', 'createAt', 'status', 'preview', 'edit', 'del'];
  dataSource = new MatTableDataSource<any>();
  form = this.formBuilder.group({
    fullName: [''],
    email: [''],
    status: ['All'],
    role: [''],
    createAtFrom: [''],
    createAtTo: [''],
  });
  sortFilter: SortFilter = {
    sortColumn: SortColumn.none,
  };
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
  selectionUser = new SelectionModel<any>(true, []);
  listStatus: Array<string> = [
    "All",
    "Active",
    "Inactive",
    "Banned",
  ];
  public listRole: Array<string> = [
    "Lecturer",
    "Student",
  ];

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataTest;
    this.totalData = this.dataTest.length;
  }

  getSortColum() {
    return SortColumn;
  }

  onSearch() {
  }

  onSortColumn(sortField: SortColumn) {
    if (this.sortFilter.sortColumn != sortField) {
      this.sortFilter.sortColumn = sortField;
      this.sortFilter.isDescendingSort = false;
    } else {
      this.switchSortDirection();
    }
  }

  formatDateCreateAt(createAt?: Date) {
    let date = '';
    if (createAt) {
      date = moment(new Date(createAt)).format("MM/DD/YYYY");
    }
    return date;
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
}
