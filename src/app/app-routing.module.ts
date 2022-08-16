import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {FeedComponent} from "./feed/feed.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "/auth"},
  {path: "auth", component: AuthComponent},
  {path: "myfeed", component: FeedComponent},
  {path: "profile/:id", component : ProfileComponent},
  {path: "**", redirectTo: "/auth"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
