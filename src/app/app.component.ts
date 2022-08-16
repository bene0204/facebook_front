import {Component, OnInit} from '@angular/core';
import {UserModel} from "./models/user.model";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'facebook_front';

  user: UserModel | undefined;

  constructor(private authService: AuthService) {
  }

ngOnInit() {
  this.authService.userChange.subscribe((user: UserModel | undefined) => {
    this.user = user;
  })


}
  logout(){
  this.authService.logout();
  }
}
