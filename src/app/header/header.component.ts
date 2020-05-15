import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authSubscription: Subscription;
  private isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.authSubject.subscribe(
      (auth) => {
        console.log(auth);
        this.isAuth = auth;
      }
    );
    this.authService.emitAuth();
  }

  onSignOut() {
    // Deconnexion
    this.authService.signOutIn(false);
    this.router.navigate(['/auth/signin']);
  }

}
