import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {IUser} from '../../interfaces/IUser';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string ;
  user: unknown;
  private isAuth: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email : [ '', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    console.log(email);

    this.authService.signIn(email, password).then(
          response => {
            if (response) {
              console.log(email + '' + password);
              this.user = response ;
              // Connexion de l'utilsateur
              this.authService.signOutIn(true);

              this.router.navigate(['/sondages']);
          } else {
              console.log('no existe');
            }
         }
    );

  }

}
