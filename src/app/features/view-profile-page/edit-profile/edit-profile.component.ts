import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/core/components/base.component';
import { Gender } from 'src/app/core/enums/gender';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends BaseComponent implements OnInit {
  public editProFileForm = this.formBuilder.group({
    userName: [''],
    fullName: [''],
    phone: [''],
    gender: [''],
    dob: []
  });
  constructor(injector: Injector, public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
  }

  onSave() {
    this.dialogRef.close();
  }

  public getEnumGender() {
    return Gender;
  }
}
