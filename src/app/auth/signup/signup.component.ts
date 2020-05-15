import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signOutForm: FormGroup;
  errorMessage: string ;
  user: unknown;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signOutForm = this.formBuilder.group({
      firstName : [ '', Validators.required],
      lastName : [ '', Validators.required],
      email : [ '', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {

    const firstname = this.signOutForm.get('firstName').value;
    const lastname = this.signOutForm.get('lastName').value;
    const email = this.signOutForm.get('email').value;
    const password = this.signOutForm.get('password').value;


    this.authService.signIn(email, password).then(
      response => {
        console.log(response);
        // Si l'utilisateur existe déjà
        if (response) {
          this.errorMessage = 'This user is already existing !';
          console.log(this.errorMessage);
        } else {
          const user = new User(firstname, lastname, email, password);
          this.authService.addUser(user).subscribe(
            (useradd) => {
              console.log(useradd);
              // this.authService.signOutIn(true);
              // Tout est bon
              this.authService.signIn(email, password).then(
                () => {
                  this.router.navigate(['/sondages']);
                },
                (error) => {
                  console.log('Autentification a échoué:' + error);
                }
              );
            }
          );
          // this.authService.signIn(email, password);
          // this.router.navigate(['/sondages']);
        }
      }
    );


  }

}
