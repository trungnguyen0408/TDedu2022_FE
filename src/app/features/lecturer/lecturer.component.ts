import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  fullname: string;
  position: number;
  email: string;
  role: string;
  create_at: string;
  status: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, fullname: 'Hydrogen', email: 'hfdg@gmail.com', role: 'student', create_at: '', status: 'active' },
  { position: 2, fullname: 'Helium', email: 'hfdg@gmail.com', role: 'student', create_at: '', status: 'active' },
  { position: 3, fullname: 'Lithium', email: 'hfdg@gmail.com', role: 'student', create_at: '', status: 'active' },
  { position: 4, fullname: 'Beryllium', email: 'hfdg@gmail.com', role: 'student', create_at: '', status: 'active' },
  { position: 5, fullname: 'Boron', email: 'hfdg@gmail.com', role: 'student', create_at: '', status: 'active' }

];
@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})
export class LecturerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  preview() {
    alert('preview');
  }
  edit() {
    alert('edit');
  }
  displayedColumns: string[] = ['position', 'fullname', 'email', 'role', 'create_at', 'status', 'preview', 'edit'];
  dataSource = ELEMENT_DATA;
}
