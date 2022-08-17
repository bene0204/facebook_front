import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CommentModel} from "../models/comment.model";
import {map} from "rxjs";

@Injectable({providedIn: "root"})
export class CommentService {
  constructor(private http: HttpClient) {
  }

  getChildren(commentId: string){
    return this.http.get<CommentModel[]>(`http://localhost:8080/comments/${commentId}/children`)
      .pipe(map((comments) => {
        return comments.map(comment => {
          return {
            ...comment,
            createdAt: new Date(comment.createdAt)
          }
        })
      }))
  }

  postChildComment(comment: {content: string}, parentId: string, authorId: string){
    return this.http.post<CommentModel[]>(`http://localhost:8080/comments/${parentId}/comment`, comment, {
      params: new HttpParams().set("authorId", authorId)
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
