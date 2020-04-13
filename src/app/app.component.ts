import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'sirFront';
  afficheForm = false;
  constructor(private api: ApiServiceService) {
  }
  ngOnInit(): void {
    this.api.getListeUsers().subscribe(res => {
      this.title = res;
      console.log(res);
    });
  }
  afficherFormulaire() {
    this.afficheForm = true;
    console.log('hi');
  }


}
