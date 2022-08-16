import {UserModel} from "./user.model";

export interface PostModel {
  postId: string,
  content: string
  createdAt: Date,
  author: UserModel
}

