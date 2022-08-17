import { Component, OnInit } from '@angular/core';
import {UserModel} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {PostModel} from "../models/post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {ProfileService} from "./profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  posts: PostModel[] = []

  postForm!: FormGroup;

  user: UserModel | undefined;

  profile: UserModel | undefined;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private route: ActivatedRoute,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.authService.userChange.subscribe(user => this.user = user)
    this.route.params.subscribe({
      next: (params) => {
        this.getProfile(params['id'])
      }
    })

    this.postForm = new FormGroup({
      content: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(2500)])
    })
  }

  onSubmit(){
    this.profileService.addPost(this.user?.userId!, this.postForm.value)
      .subscribe({
        next: response => {
          response.sort((a,b) => {
            if(a.createdAt > b.createdAt){
              return -1;
            } else if (a.createdAt < b.createdAt) {
              return 1;
            }
            return 0;
          })
          this.posts = response;
        }
      })
    this.postForm.reset();
  }

  getProfile(profileId: string){
    this.profileService.getProfile(profileId)
      .subscribe({
        next: user => {
          this.profile = user;
          this.getPosts(this.profile?.userId!)
        }
      })
  }

  getPosts(profileId: string){
    this.profileService.getPosts(profileId)
      .subscribe({
        next: response => {
          response.sort((a,b) => {
            if(a.createdAt > b.createdAt){
              return -1;
            } else if (a.createdAt < b.createdAt) {
              return 1;
            }
            return 0;
          })
          this.posts = response;

        }
      })
  }

}
