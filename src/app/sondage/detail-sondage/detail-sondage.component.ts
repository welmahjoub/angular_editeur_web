import { Component, OnInit } from '@angular/core';
import {SondageService} from '../../services/sondage.service';
import {Router, ActivatedRoute} from '@angular/router';
import { ISondage } from 'src/app/interfaces/ISondage';

@Component({
  selector: 'app-detail-sondage',
  templateUrl: './detail-sondage.component.html',
  styleUrls: ['./detail-sondage.component.css']
})
export class DetailSondageComponent implements OnInit {

  sondage: ISondage;
  constructor( private route: ActivatedRoute,
               private sondageService: SondageService,
               private router: Router ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.sondageService.getSondage(id).subscribe(
      (sond: ISondage) => {
        this.sondage = sond;
        console.log(sond);
      }
      );
  }

  onBack() {
    this.router.navigate(['/sondages']);
  }

}
