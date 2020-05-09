import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces/IUser';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  user: IUser;
  userSubject = new  Subject<IUser>();
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private  router: Router) { }

  ngOnInit() {
    const idUser = this.route.snapshot.params.id;

    this.userService.getUser(idUser).subscribe(
      (user) => {
        console.log(user);
        this.user = user;
        this.emitUser();
      }
    );
  }

  emitUser() {
    this.userSubject.next(this.user);
  }

  onBack() {
    this.router.navigate(['/users']);
  }

}
