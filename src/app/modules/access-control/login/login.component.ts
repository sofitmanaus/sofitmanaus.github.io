import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/core/models/user.model';
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
  }

  private redirect() {
    this.router.navigate(['/app/cardapio']);
  }

  logInAnonymous() {
    this.auth.anonymousLogin().then(() => {
      this.redirect()
    }
    ).catch(error => {
      this.toastr.error(error.code, 'Não foi possivel fazer o login.')
    })
  }

  linkGoogle() {
    this.auth.linkGoogleAccount().then(() => {
      this.toastr.success('Conta Google vinculada com sucesso!')
    }
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
    this.auth.unlinkGoogleAccount().then(() => {
      this.toastr.success('Conta Google desvinculada com sucesso!')
    }
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
}
