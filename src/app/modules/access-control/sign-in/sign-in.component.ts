import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserModel } from 'src/app/core/models/user.model';
import { auth } from 'firebase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  isSubmitted = false;
  loading  = false;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().then(user => {
      if (user) {
        Swal.fire({
          title: 'Você já está logado!',
          text: 'Redirecionando ao cardápio...',
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
          onAfterClose: () => this.redirect()
        })
      }
    })
    this.signInForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.signInForm.invalid){
      return;
    }

    this.loading = true;
    this.auth.emailSignIn(this.signInForm.value)
      .then(res => {
        this.loading = false;
        this.redirect()
      })
      .catch(error => {
        this.loading = false;
        error['email'] = this.signInForm.value.email
        error['credential'] = {}
        error.credential['signInMethod'] = 'password'
        this.handleLoginErrors(error)
      })
  }

  forgotPassword() {
    Swal.fire({
      title: 'Insira seu email para poder recuperar sua senha',
      input: 'email',
      inputPlaceholder: 'Email',
      showCloseButton: true
    }).then(res => {
      if ('value' in res) this.auth.resetPassword(res.value)
      .then(()=> {
        Swal.fire({
          title: 'Email enviado com sucesso!',
          showCloseButton: true,
          timer: 5000,
          timerProgressBar: true
        })
      })
      .catch(error => {
        let message = ''
        if (error.message === 'EMAIL_NOT_FOUND') message = '(Email não encontrado)'
        Swal.fire({
          title: 'Opa!',
          icon: 'error',
          text: 'Não foi possível enviar o email de recuperação'+ message + '.',
          showCloseButton: true,
          timer: 5000,
          timerProgressBar: true
        })
      })
    })
  }

  private verificationSwal() {
    return Swal.fire({
      title: 'Opa!',
      text: 'Você ainda não verificou o seu email.',
      icon: 'error',
      confirmButtonText: 'Enviar verificação',
      showCloseButton: true
    })
  }

  private emailSentSwal() {
    return Swal.fire({
      title: 'Email de confirmação enviado!',
      icon: 'success',
      showCloseButton: true,
      timer: 5000,
      timerProgressBar: true
    })
  }

  private loginErrorSwal(error: Error) {
    return Swal.fire({
      title: 'Opa!',
      text: `Não foi possível fazer o login.\n(${error.message})`,
      icon: 'error',
      showCloseButton: true,
      timer: 5000,
      timerProgressBar: true
    })
  }

  private redirect() {
    this.router.navigate(['/app/cardapio'])
  }

  loginGoogle() {
    this.auth.googleSignIn().then(() => {
      this.redirect()
    }
    ).catch(error => {
      this.handleLoginErrors(error)
    });
  }

  async loginFacebook() {
    this.auth.facebookSignIn().then(() => {
      this.redirect()
    }
    ).catch(error => {
      this.handleLoginErrors(error)
    });
  }

  private async handleLoginErrors(error) {
    console.error(error)
    if (error.message == 'Você ainda não verificou seu email.') {
      this.verificationSwal().then(res => {
        if('value' in res) this.auth.sendVerificationEmail()
          .then(() => {
            this.emailSentSwal();
            this.auth.signOut()
          })
        if('value' in res) this.auth.signOut()
      })
    } else {
      switch (error.code) {
        case 'invalid-argument':
          this.toastr.error('Os dados inseridos estão incorretos', 'Não foi possivel fazer o login.')
          break
        case 'auth/user-not-found':
          this.toastr.error('Email não está registrado', 'Não foi possivel fazer o login.')
          break
        case 'auth/cancelled-popup-request':
          this.toastr.error('O popup foi fechado', 'Não foi possivel fazer o login.')
          break
        case 'auth/popup-closed-by-user':
          this.toastr.error('O popup foi fechado', 'Não foi possivel fazer o login.')
          break
        case 'auth/account-exists-with-different-credential':
          const methods = await this.auth.getSignInMethods(error.email)
          this.accountAlreadyExists(error.email, methods, error.credential)
          break
        case 'auth/wrong-password':
          const meth = await this.auth.getSignInMethods(error.email)
          if (!meth.includes('password')) {
            const credential = await this.auth.getEmailPassCred(this.signInForm.value.email, this.signInForm.value.password);
            this.accountAlreadyExists(error.email, meth, credential)
            break
          }
          this.toastr.error('Dados incorretos', 'Não foi possivel fazer o login.')
          break
        default:
          this.toastr.error(error.code, 'Não foi possivel fazer o login.')
          break
      }
    }
  }

  private async accountAlreadyExists(email: string, methods: Array<string>, errorCredential: auth.AuthCredential) {

    const linkSwal = await Swal.fire({
      title: 'Já existe uma conta vinculada a esse email!',
      text: `O endereço ${email} já está vinculado a um login
        ${this.getMethod(methods[0])}. Deseja vincular essa conta com o login ${this.getMethod(errorCredential.signInMethod)}?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não obrigado',
      confirmButtonText: 'Sim, vincular conta'
    })
    if (linkSwal.value) {
      this.handleLoginMethods(methods[0], email, errorCredential)
    }
  }

  private async handleLoginMethods(method: string, email: string, errorCredential: auth.AuthCredential) {
    switch (method) {
      case 'google.com':
        try {
          this.loadingSwal()
          await this.auth.googleSignIn()
          const user = await this.auth.getCurrentUser()
          await user.linkWithCredential(errorCredential)
          Swal.close()
          this.linkCredentialSuccess(errorCredential)
        } catch (error) {
          Swal.close()
          this.handleLoginErrors(error)
        }
        break;
    case 'facebook.com':
      try {
        this.loadingSwal()
        const killme = await this.auth.getCurrentUser()
        await this.auth.facebookSignIn()
        const user = await this.auth.getCurrentUser()
        await user.linkWithCredential(errorCredential)
        Swal.close()
        this.linkCredentialSuccess(errorCredential)
      } catch (error) {
        Swal.close()
        this.handleLoginErrors(error)
      }
      break;
    case 'password':
      this.inputPasswordSwal(email, errorCredential)
      break;
    }
  }

  private async linkCredentialSuccess(credential: auth.AuthCredential) {
    return await Swal.fire({
      title: `Conta ${this.getMethod(credential.signInMethod)} vinculada com sucesso!`,
      icon: 'success',
      text: 'Você pode usá-la para se logar a partir de agora.',
      showCloseButton: true,
      timer: 5000,
      timerProgressBar: true
    })
  }

  private loadingSwal() {
    Swal.fire({
      title: 'Vinculando Conta...',
      text: 'Por favor aguarde',
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    })
  }

  private getMethod(method: string): string {
    switch (method) {
      case 'google.com':
        return 'Google'
      case 'password':
        return 'email e senha'
      case 'facebook.com':
        return 'Facebook'
      default:
        return ''
    }
  }

  private async inputPasswordSwal(email: string, errorCredential: auth.AuthCredential) {
    const input = await Swal.fire({
      title: `Insira a senha da conta ${email}`,
      input: 'password',
      inputPlaceholder: 'Senha',
      showCloseButton: true
    })

    if (input.value) {
      const password = input.value

      try {
        await this.auth.emailSignIn({email, password})
        await this.auth.linkCredential(errorCredential)
        await this.linkCredentialSuccess(errorCredential)
        this.redirect()
      } catch(error) {
        console.error(error)
        const wrongPass = await Swal.fire({
          title: 'Opa!',
          icon: 'error',
          text: 'Sua senha está incorreta.',
          confirmButtonText: 'Tentar novamente',
          showCloseButton: true,
          timer: 8000,
          timerProgressBar: true
        })
        if (wrongPass.value) this.inputPasswordSwal(email, errorCredential)
      }
    }
  }

  get formControls() { return this.signInForm.controls; }

}
