import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UniqueEmailValidator } from 'src/app/core/validators/unique-email.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  isPasswordVisible = true
  isConfirmVisible = true
  @ViewChild('password')
  password: ElementRef
  @ViewChild('confirmPassword')
  confirmPassword: ElementRef

  loading = false

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private emailValidator: UniqueEmailValidator
  ) {}

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required, this.emailValidator.validate.bind(this.emailValidator)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [
        Validators.required,
        Validators.minLength(8),
        this.matchValues('password'),
        ]
      ],
      firstName: ['', [Validators.required, Validators.maxLength(255)]],
      lastName: ['', [Validators.required, Validators.maxLength(255)]],
    }, {updateOn: 'blur'});

    this.signupForm.controls.password.valueChanges.subscribe(() => {
      this.signupForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  toggleConfirm() {
    this.isConfirmVisible = !this.isConfirmVisible
    if (!this.isConfirmVisible) {
      this.renderer.setAttribute(this.confirmPassword.nativeElement, 'type', 'text')
    } else {
      this.renderer.setAttribute(this.confirmPassword.nativeElement, 'type', 'password')
    }
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible
    if (!this.isPasswordVisible) {
      this.renderer.setAttribute(this.password.nativeElement, 'type', 'text')
    } else {
      this.renderer.setAttribute(this.password.nativeElement, 'type', 'password')
    }
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  // Pra debuggar os Validators
  getFormValidationErrors() {
    Object.keys(this.signupForm.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.signupForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

  register() {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.auth.emailSignUp(this.signupForm.value)
    .then(res => {
      this.loading = false
      this.emailSentSwal()
    })
    .catch(error => {
      this.loading = false;
      this.toastr.error(error.code, 'Não foi possivel criar sua conta.')
    })
  }

  private emailSentSwal() {
    return Swal.fire({
      title: 'Quase lá!',
      text: 'Para concluir seu cadastro, vá até sua caixa postal e confirme seu email',
      icon: 'warning',
      showCloseButton: true,
      timer: 3000,
      timerProgressBar: true,
      onAfterClose: () => { this.router.navigateByUrl('/app/cardapio') }
    })
  }

  private redirect() {
    this.router.navigate(['/app/cardapio']);
  }

  get formControls() {
    return this.signupForm.controls;
  }
}
