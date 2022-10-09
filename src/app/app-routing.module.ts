import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DepartmentComponent } from './features/department/department.component';
import { LecturerComponent } from './features/lecturer/lecturer.component';
import { StudentComponent } from './features/student/student.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'department', component: DepartmentComponent, canActivate: [AuthGuard] },
  { path: 'lecturer', component: LecturerComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
