import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../models/post.model";
import {Router} from "@angular/router";
import {PostService} from "./post.service";
import {CommentModel} from "../models/comment.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../models/user.model";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  @Input() post!: PostModel;

  comments: CommentModel[] = [];

  commentForm!: FormGroup;

  showComments = false;

  user: UserModel | undefined;

  constructor(private router: Router,
              private postService: PostService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userChange.subscribe(user => this.user = user)
    this.commentForm = new FormGroup({
      content: new FormControl("", [Validators.required,Validators.minLength(2),Validators.maxLength(500)])
    })
    this.postService.getComments(this.post.postId)
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
          this.comments = response;
        }
      })

  }

  onSubmit(){
    this.postService.postComment(this.commentForm.value,this.post.postId,this.user!.userId!)
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
          this.comments = response;
          this.commentForm.reset();
        }
      })
  }


  viewProfile(userId: String){
    this.router.navigate(["/profile",userId]);
  }
}
