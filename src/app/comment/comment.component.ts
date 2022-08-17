import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../models/comment.model";
import {Router} from "@angular/router";
import {CommentService} from "./comment.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../models/user.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
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

  childForm!: FormGroup;

  @Input() comment!: CommentModel;

  children: CommentModel[] = [];

  showChildren = false;

  user: UserModel | undefined;

  constructor(private router: Router,
              private commentService: CommentService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userChange.subscribe(user => this.user = user)
    if(this.comment.post){
  this.commentService.getChildren(this.comment.commentId)
    .subscribe({
      next: response => {
        response.sort((a,b) => {
          if(a.createdAt > b.createdAt){
            return 1;
          } else if (a.createdAt < b.createdAt) {
            return -1;
          }
          return 0;
        })
        this.children = response
      }
    })
    }

    this.childForm = new FormGroup({
      content: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(500)])
    })
  }

  onSubmit(){
    this.commentService.postChildComment(this.childForm.value, this.comment.commentId, this.user?.userId!)
      .subscribe({
        next: response => {
          response.sort((a,b) => {
            if(a.createdAt > b.createdAt){
              return 1;
            } else if (a.createdAt < b.createdAt) {
              return -1;
            }
            return 0;
          })
          this.children = response
          this.childForm.reset();
        }
      })
  }


  viewProfile(userId: String){
    this.router.navigate(["/profile",userId]);
  }
}
