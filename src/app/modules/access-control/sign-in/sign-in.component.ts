import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
            default:
              console.log(error)
              this.toastr.error(error.code, 'Não foi possivel fazer o login.')
              break
          }
        }
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
          timer: 3000,
          timerProgressBar: true
        })
      })
      .catch(error => {
        let message = ''
        if (error.message === 'EMAIL_NOT_FOUND') message = '(Email não encontrado)'
        Swal.fire({
          title: 'Opa!',
          text: 'Não foi possível enviar o email de recuperação'+ message + '.',
          showCloseButton: true,
          timer: 3000,
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
      confirmButtonText: 'Reenviar verificação',
      showCloseButton: true
    })
  }

  private emailSentSwal() {
    return Swal.fire({
      title: 'Email de confirmação enviado!',
      icon: 'success',
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true
    })
  }

  private loginErrorSwal(error: Error) {
    return Swal.fire({
      title: 'Opa!',
      text: `Não foi possível fazer o login.\n(${error.message})`,
      icon: 'error',
      showCloseButton: true,
      timer: 3000,
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
      this.toastr.error(error.code, 'Não foi possivel fazer o login.')
    });
  }

  loginFacebook() {
    this.auth.facebookSignIn().then(() => {
      this.redirect()
    }
    ).catch(error => {
      this.toastr.error(error.code, 'Não foi possivel fazer o login.')
    });
  }

  get formControls() { return this.signInForm.controls; }

}
