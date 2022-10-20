import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SortColumn } from 'src/app/core/enums/sort-column';
import { FilterUser } from 'src/app/core/models/filter-user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['select', 'fullName', 'email', 'role', 'createAt', 'status', 'preview', 'edit', 'del'];
  dataSource = new MatTableDataSource<any>();
  searchKeyWordChange = new Subject<string>();
  public searchForm = this.formBuilder.group({
    search: [''],
  });
  public filterUser: FilterUser = {
    keyWork: '',
    sortColumn: SortColumn.none,
    pageIndex: 1,
    pageSize: 10
  };
  public skip = 0;
  selectionUser = new SelectionModel<any>(true, []);

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
    this.initSearchChange();
  }

  getSortColum() {
    return SortColumn;
  }

  onSortColumn(sortField: SortColumn) {
    if (this.filterUser.sortColumn != sortField) {
      this.filterUser.sortColumn = sortField;
      this.filterUser.isDescendingSort = false;
    } else {
      this.switchSortDirection();
    }
  }

  switchSortDirection() {
    this.filterUser.isDescendingSort = this.filterUser.isDescendingSort ? false : true;
  }

  initSearchChange() {
    this.searchKeyWordChange.pipe(
      debounceTime(1000),
      distinctUntilChanged()).subscribe(value => {
        this.filterUser.keyWork = value;
      })
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
    this.filterUser.pageSize = e.take;
    this.filterUser.pageIndex = Math.ceil((e.skip + 1) / e.take);
  }
}
