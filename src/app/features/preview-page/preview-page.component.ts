import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/core/components/base.component';
import { AccountUser } from 'src/app/core/models/account-user';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.scss']
})
export class PreviewPageComponent extends BaseComponent implements OnInit {
  user: AccountUser = new AccountUser();
  items = Array.from({ length: 20 }).map((_, i) => `Item #${i}`);
  constructor(injector: Injector, public dialogRef: MatDialogRef<PreviewPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
  }

  ngOnInit(): void {
    this.user = this.data;
    this.user.date_of_birth = this.formatDate(new Date(this.data.date_of_birth), "MM-DD-YYYY");
  }

}
