import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './features/student/student.component';
import { DepartmentComponent } from './features/department/department.component';
import { LecturerComponent } from './features/lecturer/lecturer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from './core/components/nav/nav.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    DepartmentComponent,
    LecturerComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
