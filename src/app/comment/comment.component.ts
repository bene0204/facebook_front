import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../models/comment.model";
import {Router} from "@angular/router";
import {CommentService} from "./comment.service";

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

  @Input() comment!: CommentModel;

  children: CommentModel[] = [];

  showChildren = false;

  constructor(private router: Router,
              private commentService: CommentService) { }

  ngOnInit(): void {
    if(this.comment.post){
  this.commentService.getChildren(this.comment.commentId)
    .subscribe({
      next: response => {
        console.log(response);
        this.children = response
      }
    })
    }
  }


  viewProfile(userId: String){
    this.router.navigate(["/profile",userId]);
  }
}
