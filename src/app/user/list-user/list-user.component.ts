import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {IUser} from '../../interfaces/IUser';
import {ISondage} from '../../interfaces/ISondage';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
   userSubscription: Subscription;
   user: IUser;
   sondage: ISondage;
  users: IUser;
  usersSubscription: Subscription;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.usersSubscription = this.userService.usersSubject.subscribe(
      (users)  => {
        this.users = users;
      }
    );

    this.userService.emitUsers();
  }

  onViewSondage(id) {
  }

}
