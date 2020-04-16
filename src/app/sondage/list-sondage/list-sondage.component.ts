import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {IUser} from '../../interfaces/IUser';
import {ISondage} from '../../interfaces/ISondage';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {SondageService} from '../../services/sondage.service';

@Component({
  selector: 'app-list-sondage',
  templateUrl: './list-sondage.component.html',
  styleUrls: ['./list-sondage.component.css']
})
export class ListSondageComponent implements OnInit {

  userSubscription: Subscription;
  user: IUser;
  sondages;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private sondageService: SondageService,
              private router: Router ) { }

  ngOnInit() {

    this.authService.emitUser();
    this.sondageService.getListeSondage().subscribe(
          (sondages) => {
            this.sondages = sondages ;
            console.log(sondages);
          }
        );
  }

}
