import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from 'src/app/modules/access-control/content/content.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { CanReadGuard } from 'src/app/core/guards/can-read.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, children: [
    { path: 'content', component: ContentComponent, canActivate:[CanReadGuard] },
    { path: 'admin', component: AdminComponent, canActivate:[AdminGuard] },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessControlRoutingModule { }
