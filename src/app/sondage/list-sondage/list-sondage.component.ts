import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {IUser} from '../../interfaces/IUser';
import {ISondage} from '../../interfaces/ISondage';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {SondageService} from '../../services/sondage.service';
import {Sondage} from '../../models/Sondage';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-list-sondage',
  templateUrl: './list-sondage.component.html',
  styleUrls: ['./list-sondage.component.css']
})
export class ListSondageComponent implements OnInit {

  userSubscription: Subscription;
  user: IUser;
  sondages;
  private sond: Sondage;

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
    this.user = this.sondageService.getUser();
  }

  onViewSondage(id) {
  this.router.navigate(['/detail-sondage', id]);
  }

  onDeleteSondage(id) {
    this.sondageService.removeSondage(id).subscribe(
      (res) => {
        const resp = res.json();
        console.log(resp);
      }
    );
    this.router.navigate(['/sondages']);
  }

  onUpdateSondage(sondage: ISondage) {
    this.router.navigate(['/edit-sondage', sondage.id]);
  }


}
