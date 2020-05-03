import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router) { }

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
    this.auth.emailSignIn(this.signInForm.value).then(res => this.router.navigateByUrl('/app/cardapio'))
  }

  get formControls() { return this.signInForm.controls; }

}
