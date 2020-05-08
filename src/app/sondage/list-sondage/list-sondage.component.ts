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
  sondages: ISondage;
  sondagesSubscription: Subscription;
  // private sond: Sondage;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private sondageService: SondageService,
              private router: Router ) { }

  ngOnInit() {

    this.authService.emitUser();

    // Souscription au subject de sondage pour recupérer la liste des sondages
    this.sondagesSubscription = this.sondageService.sondagesSubject.subscribe(
      (sonds) => {
        this.sondages = sonds;
        // console.log(sonds);
      }
    );
    // On fait emit pour declencher la souscription
    this.sondageService.emitSondage();
    // this.sondageService.getListeSondage().subscribe(
    //       (sondages) => {
    //         this.sondages = sondages ;
    //         console.log(sondages);
    //       }
    //     );
    this.user = this.sondageService.getUser();
  }

  onViewSondage(id) {
  this.router.navigate(['/detail-sondage', id]);
  }

  onDeleteSondage(id) {
    this.sondageService.removeSondage(id).subscribe(
      (res) => {
        console.log(res.toString());
        // Si la suppression a été effectuée emettre la liste pour rafraichir la celle-ci dans le component list-sondage
        if (res) {
          this.sondageService.emitSondage();
        }
        // this.router.navigate(['/sondages']);
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['/sondages']);
  }

  onUpdateSondage(sondage: ISondage) {
    this.router.navigate(['/edit-sondage', sondage.id]);
  }

  ngOnDestroy() {
    this.sondagesSubscription.unsubscribe();
  }


}
