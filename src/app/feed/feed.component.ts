import { Component, OnInit } from '@angular/core';
import {PostModel} from "../models/post.model";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {AuthService} from "../auth/auth.service";
import {map} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: PostModel[] = []

  postForm!: FormGroup;

  user: UserModel | undefined;

  constructor(private http: HttpClient,
  private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userChange.subscribe(user => this.user = user)
    this.getPosts();

    this.postForm = new FormGroup({
      content: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(2500)])
    })
  }

  onSubmit(){
    this.http.post<PostModel>(`http://localhost:8080/users/${this.user?.userId}/post`, this.postForm.value)
      .subscribe({
        next: response => {
        }
      })
    this.postForm.reset();
  }

getPosts(){
  this.http.get<PostModel[]>(`http://localhost:8080/users/${this.user?.userId}/feed`)
    .pipe(
      map((posts) => {
        return  posts.map(post => {
          return {
            ...post,
            createdAt: new Date(post.createdAt)
          }
        })
      }))
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
