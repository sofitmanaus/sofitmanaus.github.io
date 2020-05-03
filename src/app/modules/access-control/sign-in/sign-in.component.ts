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
    this.isSubmitted = true;
    if(this.signInForm.invalid){
      return;
    }
    this.auth.emailSignIn(this.signInForm.value)
      .then(res => {
        this.redirect()
      })
      .catch(error => {
        if (error.message == 'Você ainda não verificou seu email.') {
          this.verificationSwal().then(res => {
            if('value' in res) this.auth.sendVerificationEmail()
              .then(() => {
                this.emailSentSwal();
                this.auth.signOut()
              })
            if('value' in res) this.auth.signOut()
          })
        } else { this.toastr.error(error.code, 'Não foi possivel fazer o login.') }
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
