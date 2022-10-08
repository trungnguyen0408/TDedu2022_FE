import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './features/department/department.component';
import { LecturerComponent } from './features/lecturer/lecturer.component';
import { StudentComponent } from './features/student/student.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'lecturer', component: LecturerComponent },
  { path: 'student', component: StudentComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
