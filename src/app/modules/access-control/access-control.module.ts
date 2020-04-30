import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccessControlRoutingModule } from './access-control-routing.module';
import { ContentComponent } from './content/content.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    LoginComponent,
    ContentComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AccessControlRoutingModule
  ]
})
export class AccessControlModule { }
