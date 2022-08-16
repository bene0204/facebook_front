import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm!: FormGroup;

  isLogin = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      userName: new FormControl("",[Validators.required, Validators.minLength(5)])
    })
  }

  switchMode(){
    this.isLogin = !this.isLogin;
  }


  onSubmit(){
    const user: UserModel = {
      userName: this.authForm.value.userName
    }

    if(this.isLogin){
      this.authService.login(user);
    } else {
      this.authService.register(user);
    }
  }
}
