import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from 'src/app/modules/access-control/content/content.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, children: [{ path: 'content', component: ContentComponent }] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessControlRoutingModule { }
