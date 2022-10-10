import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  public registerForm = this.formBuilder.group({
    userName: [''],
    fullName: [''],
    phone: [''],
    email: [''],
    passWord: [''],
    confirmPassword: [''],
    gender: [''],
    dob: []
  });

  onRegister(): void {
    this.dialogRef.close();
  }

  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    return datePipe.transform(value, 'MM/dd/yyyy');
  }
}
