import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/user.model';
import { of } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  version: string;
  owner: string;
  contact: string;
  loading: boolean;
  route;

  constructor(
      private auth: AuthService,
      private toastr: ToastrService,
      private router: Router
  ) {
      this.version = environment.APP.VERSION;
      this.owner = environment.APP.OWNER;
      this.contact = environment.APP.CONTACT;
  }

  ngOnInit() {
      // if (this.auth.isAuthenticated()) {
      //     this.redirectToHome();
      // }
  }

  public async login() {
      if (this.isValid()) {
          // try {
          //     this.loading = true;
          //     const response = await this.auth.anonymousLogin();
          //     if (!response) {
          //         this.toastr.error('Dados de acesso inválidos.');
          //         this.loading = false;
          //     } else {
          //         this.loginService.saveUserData(response);
          //         window.location.reload();
          //     }
          // } catch (response) {
          //     this.loading = false;
          //     if (response.error && response.error.erro) {
          //         this.toastr.error(response.error.erro);
          //     } else {
          //         this.toastr.error('Dados de acesso inválidos.');
          //     }
          // }
      }
  }

  private isValid(): boolean {
      let isValid = true;
      this.toastr.clear();
      if (!this.user.username && !this.user.password) {
          this.toastr.error('Informe o nome de usuário e senha');
          isValid = false;
      } else if (!this.user.username) {
          this.toastr.error('Informe o nome de usuário');
          isValid = false;
      } else if (!this.user.password) {
          this.toastr.error('Informe a senha.');
          isValid = false;
      }
      return isValid;
  }

    private redirectToHome() {
        this.router.navigate(['app/home']);
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
