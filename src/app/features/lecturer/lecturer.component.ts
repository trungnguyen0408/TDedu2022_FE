import { SelectionModel } from '@angular/cdk/collections';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { finalize } from 'rxjs';
import { BaseComponent } from 'src/app/core/components/base.component';
import { APP_MESSAGE } from 'src/app/core/constants/app-message-constant';
import { STATUS_BAN } from 'src/app/core/constants/status-ban-constant';
import { UserStatus } from 'src/app/core/constants/user-status-constant';
import { ActionType } from 'src/app/core/enums/action-type';
import { FilterUser } from 'src/app/core/models/filter-user';
import { SortFilter } from 'src/app/core/models/sort-filter';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { UserService } from 'src/app/core/services/user.service';
import { PreviewPageComponent } from '../preview-page/preview-page.component';
import { AddOrEditUserOfLecturerComponent } from './add-or-edit-user-of-lecturer/add-or-edit-user-of-lecturer.component';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})
export class LecturerComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['full_name', 'email', 'role', 'created_at', 'status', 'preview', 'edit'];
  dataSource = new MatTableDataSource<any>();
  form: FormGroup;
  fullName: string;
  email: string;
  status: string;
  createAtFrom: Date;
  createAtTo: Date;
  skip: number = 0;
  pageSize: number = 10;
  pageIndex: number = 1;
  totalData: number;
  selectionUser = new SelectionModel<any>(true, []);
  sortFilter: SortFilter = {
    sort_name: '',
    sort_type: ''
  };

  listStatus = UserStatus.Status;
  defaultItem: { text: string, value: string } = { text: 'All', value: '' };

  constructor(injector: Injector, public localStorageService: LocalStorageService, private router: Router, private authService: AuthService, private dialog: MatDialog, private userService: UserService) {
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
    this.handleGetUser();
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
    filter.page = this.pageIndex;
    filter.limit = this.pageSize;
    filter.sort_name = this.sortFilter.sort_name;
    filter.sort_type = this.sortFilter.sort_type;
    if ((filter.sort_name === 'role' || filter.sort_name === 'full_name')) {
      filter.sort_name = '';
    }

    this.getUserByFilter(filter);
  }

  getFormValue(name: string) {
    return this.form.get(name)?.value ?? '';
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
      if (err.error[Object.keys(err.error)[0]] === STATUS_BAN.UNAUTHORIZED) {
        this.alertMessageService.error(APP_MESSAGE.BANNED);
        this.authService.logOut().subscribe(data => {
          if (data) {
            this.localStorageService.removeAll();
            this.authService.loggedIn$.next(false);
            this.router.navigate(['']);
          }
        });
      } else {
        this.alertMessageService.error(err.error[Object.keys(err.error)[0]] ?? '');
      };
    });
  }

  isUserInputSubmittedDate(): boolean {
    return this.createAtFrom != null || this.createAtTo != null ? true : false;
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
        }
      }, (err) => {
        if (err.error[Object.keys(err.error)[0]] === STATUS_BAN.UNAUTHORIZED) {
          this.alertMessageService.error(APP_MESSAGE.BANNED);
          this.authService.logOut().subscribe(data => {
            if (data) {
              this.localStorageService.removeAll();
              this.authService.loggedIn$.next(false);
              this.router.navigate(['']);
            }
          });
        }else{
          this.alertMessageService.error(APP_MESSAGE.USER_NOT_FOUND);
        }
      });
  }

  onEdit(item: any) {
    this.showLoader();
    this.userService.getById(item.id)
      .pipe(finalize(() => {
        this.showLoader(false);
      }))
      .subscribe((responses) => {
        if (responses) {
          const dialogRef = this.dialog.open(AddOrEditUserOfLecturerComponent, {
            data: { type: ActionType.edit, user: responses },
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.handleGetUser();
            }
          });
        }
      }, (err) => {
        if (err.error[Object.keys(err.error)[0]] === STATUS_BAN.UNAUTHORIZED) {
          this.alertMessageService.error(APP_MESSAGE.BANNED);
          this.authService.logOut().subscribe(data => {
            if (data) {
              this.localStorageService.removeAll();
              this.authService.loggedIn$.next(false);
              this.router.navigate(['']);
            }
          });
        }else{
          this.alertMessageService.error(APP_MESSAGE.USER_NOT_FOUND);
        }
      });
  }

  onCreate() {
    const dialogRef = this.dialog.open(AddOrEditUserOfLecturerComponent, {
      data: { type: ActionType.add, user: {} },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleGetUser();
      }
    });
  }

  sortData(sortState: Sort) {
    this.sortFilter.sort_name = sortState.active;
    this.sortFilter.sort_type = sortState.direction;
    this.handleGetUser();
  }
}
