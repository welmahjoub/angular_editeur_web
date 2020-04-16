import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder} from "@angular/forms";
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {IUser} from '../../interfaces/IUser';
import {ISondage} from '../../interfaces/ISondage';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
   userSubscription: Subscription;
   user: IUser;
   sondage: ISondage;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router ) { }

  ngOnInit() {
  }

}
