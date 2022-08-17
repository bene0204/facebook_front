import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CommentModel} from "../models/comment.model";
import {map, Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class PostService {


  constructor(private http: HttpClient) {
  }

  getComments(postId: string){
    return this.http.get<CommentModel[]>(`http://localhost:8080/posts/${postId}/comments`)
      .pipe(map((comments) => {
       return comments.map(comment => {
          return {
            ...comment,
            createdAt: new Date(comment.createdAt)
          }
        })
      }))
  }

  postComment(comment: {content: string}, postId: string, authorId: string){
    return this.http.post<CommentModel[]>(
      `http://localhost:8080/posts/${postId}/comment`,
      comment,
      {
      params: new HttpParams().set("userId",authorId)
    }).pipe(map((comments) => {
      return comments.map(comment => {
        return {
          ...comment,
          createdAt: new Date(comment.createdAt)
        }
      })
    }))
  }


}
