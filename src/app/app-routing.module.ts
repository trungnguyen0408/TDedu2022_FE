import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { HomeComponent } from './features/home/home.component';
import { LecturerComponent } from './features/lecturer/lecturer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'lecturer', component: LecturerComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
