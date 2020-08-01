import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { UserPageComponent } from './user-page/user-page.component';


const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'posts', component: PostsPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: '**', component: NotFoundPageComponent }
  // { path: '**', component: NotFoundPageComponent, redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
