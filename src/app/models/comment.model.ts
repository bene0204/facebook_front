import {PostModel} from "./post.model";
import {UserModel} from "./user.model";

export interface CommentModel{
  commentId: string,
  content: string,
  post?: PostModel,
  parent?: CommentModel,
  author: UserModel,
  createdAt: Date
}
