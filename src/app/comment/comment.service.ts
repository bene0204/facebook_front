import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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
}
