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
import { UniqueEmailValidator } from 'src/app/core/validators/unique-email.validator';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

@NgModule({
  declarations: [
    LoginComponent,
    ContentComponent,
    AdminComponent,
    SignInComponent,
    SignUpComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [
    CommonModule,
    AccessControlRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  providers: [UniqueEmailValidator]
})
export class AccessControlModule { }
