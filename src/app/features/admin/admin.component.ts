import { SelectionModel } from '@angular/cdk/collections';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { MatDialog } from '@angular/material/dialog';
import { PreviewPageComponent } from '../preview-page/preview-page.component';
import { UserStatus } from 'src/app/core/constants/user-status-constant';
import { FilterUser } from 'src/app/core/models/filter-user';
import { UserRole } from 'src/app/core/constants/user-role-constant';
import { APP_MESSAGE } from 'src/app/core/constants/app-message-constant';
import { BaseComponent } from 'src/app/core/components/base.component';
import { AddOrEditUserOfAdminComponent } from './add-or-edit-user-of-admin/add-or-edit-user-of-admin.component';
import { ActionType } from 'src/app/core/enums/action-type';
import { UserService } from 'src/app/core/services/user.service';
import { Sort } from '@angular/material/sort';
import { finalize } from 'rxjs';
import { AccountUser } from 'src/app/core/models/account-user';
import { DialogConfirmComponent } from 'src/app/core/components/dialog-confirm/dialog-confirm.component';
import * as FileSaver from 'file-saver';
import { SortFilter } from 'src/app/core/models/sort-filter';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['select', 'full_name', 'email', 'role', 'created_at', 'status', 'preview', 'edit', 'del'];
  dataSource = new MatTableDataSource<any>();
  form: FormGroup;
  fullName: string;
  email: string;
  status: string;
  role: string;
  createAtFrom: Date;
  createAtTo: Date;
  skip: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;
  totalData: number;
  sortFilter: SortFilter = {
    sort_name: '',
    sort_type: ''
  };

  selectionUser = new SelectionModel<any>(true, []);
  listStatus = UserStatus.Status;
  defaultItem: { text: string, value: string } = { text: 'All', value: '' };
  listRole = UserRole.Roles;

  constructor(injector: Injector, private dialog: MatDialog, private userService: UserService) {
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
    this.handleGetUser();
  }

  onSearch() {
    this.handleGetUser();
  }

  onBulkDelete() {
    if (this.selectionUser.selected.length === 0) {
      this.alertMessageService.error(APP_MESSAGE.BULK_DELETE_BLANK);
      return;
    }

    let msg = this.selectionUser.selected.length === 1 ? `Do you want to remove "${this.selectionUser.selected[0].full_name}" ?` : APP_MESSAGE.BULK_DELETE;
    let ids = this.getIdsFromUsers(this.selectionUser.selected);

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      minWidth: '400px',
      data: { confirmDialog: true, message: msg }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.userService.bulkDelete(ids).subscribe(response => {
          if (response) {
            this.alertMessageService.success(APP_MESSAGE.DELETE_SUCCESSFULL);
            this.selectionUser.clear();
            this.handleGetUser();
          }
        }, (err) => {
          this.alertMessageService.error(APP_MESSAGE.BULK_DELETE_ERROR);
        })
      }
    });
  }

  getIdsFromUsers(users: AccountUser[]): string[] {
    let ids: string[] = [];
    users.forEach(user => ids.push(user.id));
    return ids;
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
    this.pageIndex = Math.ceil((e.skip + 1) / e.take);
    this.handleGetUser();
  }

  onPreview(item: any) {
    this.showLoader();
    this.userService.getById(item.id)
      .pipe(finalize(() => {
        this.showLoader(false);
      }))
      .subscribe((responses) => {
        if (responses) {
          const dialogRef = this.dialog.open(PreviewPageComponent, {
            data: responses
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.handleGetUser();
            }
          });
        } else {
          this.alertMessageService.error(APP_MESSAGE.USER_NOT_FOUND);
        }
      });
  }

  sortData(sortState: Sort) {
    this.sortFilter.sort_name = sortState.active;
    this.sortFilter.sort_type = sortState.direction;
    this.handleGetUser();
  }

  onEdit(item: any) {
    this.showLoader();
    this.userService.getById(item.id)
      .pipe(finalize(() => {
        this.showLoader(false);
      }))
      .subscribe((responses) => {
        if (responses) {
          const dialogRef = this.dialog.open(AddOrEditUserOfAdminComponent, {
            data: { type: ActionType.edit, user: responses },
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.handleGetUser();
            }
          });
        } else {
          this.alertMessageService.error(APP_MESSAGE.USER_NOT_FOUND);
        }
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AddOrEditUserOfAdminComponent, {
      data: { type: ActionType.add, user: {} },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleGetUser();
      }
    });
  }

  onDelete(item: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      minWidth: '400px',
      data: { confirmDialog: true, message: `Do you want to remove "${item.full_name}" ?` }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.userService.delete(item.id).subscribe(response => {
          if (response) {
            this.alertMessageService.success(APP_MESSAGE.DELETE_SUCCESSFULL);
            this.handleGetUser();
          }
        }, (err) => {
          this.alertMessageService.error(APP_MESSAGE.BULK_DELETE_ERROR);
        })
      }
    });
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
    filter.page = this.pageIndex;
    filter.limit = this.pageSize;
    filter.sort_name = this.sortFilter.sort_name;
    if ((filter.sort_name === 'role' || filter.sort_name === 'full_name')) {
      filter.sort_name = '';
    }
    filter.sort_type = this.sortFilter.sort_type;

    this.getUserByFilter(filter);
  }

  getUserByFilter(filter: FilterUser) {
    this.showLoader();
    this.userService.filter(filter).pipe(finalize(() => {
      this.showLoader(false);
    })).subscribe(response => {
      if (response) {
        this.dataSource.data = response.data;
        this.totalData = response.total;
      }
    }, (err) => {
      this.alertMessageService.error(err.error[Object.keys(err.error)[0]] ?? '');
    });
  }

  getFormValue(name: string) {
    return this.form.get(name)?.value ?? '';
  }

  isUserInputCreateAt(): boolean {
    return this.createAtFrom != null || this.createAtTo != null ? true : false;
  }

  onExportAll() {
    this.showLoader();
    this.userService.exportAll().pipe(finalize(() => {
      this.showLoader(false);
    })).subscribe(response => {
      this.downloadFile(response, 'all_user_information.xlsx')
    });
  }

  downloadFile(data: any, fileName: string = 'users_information.xlsx') {
    const myBlob: Blob = new Blob([data], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(myBlob, fileName);
  }

  onBulkExport() {
    if (this.selectionUser.selected.length === 0) {
      this.alertMessageService.error(APP_MESSAGE.BULK_EXPORT_BLANK);
      return;
    }

    let ids = this.getIdsFromUsers(this.selectionUser.selected);
    this.showLoader();
    this.userService.bulkExport(ids).pipe(finalize(() => {
      this.showLoader(false);
    })).subscribe(response => {
      this.downloadFile(response);
      this.selectionUser.clear();
    }, (err) => {
      this.alertMessageService.error(APP_MESSAGE.BULK_EXPORT_ERROR);
    })
  }
}
