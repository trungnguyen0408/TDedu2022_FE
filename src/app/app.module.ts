import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LecturerComponent } from './features/lecturer/lecturer.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { AdminComponent } from './features/admin/admin.component';
import { PreviewPageComponent } from './features/preview-page/preview-page.component';
import { NavComponent } from './core/components/nav/nav.component';
import { AddOrEditUserOfLecturerComponent } from './features/lecturer/add-or-edit-user-of-lecturer/add-or-edit-user-of-lecturer.component';
import { AddOrEditUserOfAdminComponent } from './features/admin/add-or-edit-user-of-admin/add-or-edit-user-of-admin.component';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IconsModule } from "@progress/kendo-angular-icons";
import { PagerModule } from '@progress/kendo-angular-pager';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { ViewProfilePageComponent } from './features/view-profile-page/view-profile-page.component';
import { EditProfileComponent } from './features/view-profile-page/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './features/view-profile-page/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LecturerComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PreviewPageComponent,
    AddOrEditUserOfLecturerComponent,
    AddOrEditUserOfAdminComponent,
    ResetPasswordComponent,
    ViewProfilePageComponent,
    EditProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
    PagerModule,
    MatSnackBarModule,
    MatTabsModule,
    InputsModule,
    LabelModule,
    ScrollingModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
