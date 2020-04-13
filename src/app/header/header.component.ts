import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authSubscription: Subscription;
  private isAuth: boolean;

  constructor(private authService: AuthService) { }

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
    this.authService.signOut(false);
  }

}
