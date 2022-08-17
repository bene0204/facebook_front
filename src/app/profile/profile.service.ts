import {Injectable} from "@angular/core";
import {PostModel} from "../models/post.model";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";

@Injectable({providedIn: "root"})
export class ProfileService{

  constructor(private http: HttpClient) {
  }

  addPost(userId: string, post: {content: string}){
   return  this.http.post<PostModel[]>(`http://localhost:8080/users/${userId}/post`, post)
      .pipe(
        map((posts) => {
          return  posts.map(post => {
            return {
              ...post,
              createdAt: new Date(post.createdAt)
            }
          })
        }))
  }

  getPosts(userId: string){
   return this.http.get<PostModel[]>(`http://localhost:8080/users/${userId}/posts`)
      .pipe(
        map((posts) => {
          return  posts.map(post => {
            return {
              ...post,
              createdAt: new Date(post.createdAt)
            }
          })
        }))
  }

  getProfile(profileId: string){
  return this.http.get<UserModel>(`http://localhost:8080/users/${profileId}`)
  }
}
