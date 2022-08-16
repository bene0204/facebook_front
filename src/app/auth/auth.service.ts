import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {UserModel} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthService{

  userChange = new BehaviorSubject<UserModel | undefined>(undefined);

  constructor(private http: HttpClient,
              private router : Router) {
  }

  login(user: UserModel) {
    this.http.post<UserModel>("http://localhost:8080/users/login",user)
      .subscribe({
        next: response => {
          this.userChange.next(response);

          this.router.navigate(["/myfeed"]);
        }
      })
  }

  register(user: UserModel) {
    this.http.post<UserModel>("http://localhost:8080/users",user)
      .subscribe({
        next: response => {
          console.log(response)
        }
      })
  }

  logout(){
    this.userChange.next(undefined);
    this.router.navigate(["/auth"])
  }

  autoLogout() {
    setTimeout(() => {
      this.logout();
    }, 5000)
  }
}
