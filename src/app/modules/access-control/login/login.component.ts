import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/user.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserModel;

  constructor(public auth: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logInAnonymous() {
    this.auth.anonymousLogin().then(() =>
      this.toastr.success('Logado com sucesso!')
    ).catch(error => {
      this.toastr.error(error.code, 'Não foi possivel fazer o login.')
    })
  }

  loginGoogle() {
    this.auth.googleSignIn().then(() =>
      this.toastr.success('Logado com sucesso!')
    ).catch(error => {
      this.toastr.error(error.code, 'Não foi possivel fazer o login.');
    });
  }

  linkGoogle() {
    this.auth.linkGoogleAccount().then(() =>
      this.toastr.success('Conta Google vinculada com sucesso!')
    ).catch(error => {
      console.error(error);
      switch (error.code) {
        case 'auth/provider-already-linked':
          this.toastr.error(error.code, 'Essa conta já está vinculada.')
          break

        default:
          this.toastr.error(error.code, 'Não foi possivel vincular essa conta.')
          break
      }
    })
  }

  unlinkGoogle() {
    this.auth.unlinkGoogleAccount().then(() =>
      this.toastr.success('Conta Google desvinculada com sucesso!')
    ).catch(error => {
      console.error(error);
      switch (error.code) {
        case 'auth/no-such-provider':
          this.toastr.error(error.code, 'Não foi encontrado uma conta para se desvincular.')
          break

        default:
          this.toastr.error(error.code, 'Não foi possivel fazer o login.')
          break
      }
    })
  }

  loginFacebook() {
    this.auth.facebookSignIn().then(() =>
      this.toastr.success('Logado com sucesso!')
    ).catch(error => {
      this.toastr.error(error.code, 'Não foi possivel fazer o login.');
    });
  }
}
