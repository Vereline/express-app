import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PostsPageComponent } from './posts/posts-page/posts-page.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { SignupPageComponent } from './user/signup-page/signup-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PathResolveService } from './services/path-resolve.service';
import { paths } from './app-paths';

const routes: Routes = [
  { path: paths.home, pathMatch: 'full', component: StartPageComponent },
  { path: paths.posts, component: PostsPageComponent },
  { path: paths.user, component: UserPageComponent },
  { path: paths.login, component: LoginPageComponent },
  { path: paths.signup, component: SignupPageComponent },
  { path: paths.about, component: AboutPageComponent },
  { path: '**',     resolve: { path: PathResolveService }, component: NotFoundPageComponent }
  // { path: '**', component: NotFoundPageComponent, redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
