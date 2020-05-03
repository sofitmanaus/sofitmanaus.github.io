import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccessControlRoutingModule } from './access-control-routing.module';
import { ContentComponent } from './content/content.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    LoginComponent,
    ContentComponent,
    AdminComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AccessControlRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class AccessControlModule { }
