import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games/games.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewsComponent } from './reviews/reviews.component';
import {CommentsComponent} from './comments/comments.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full' },
    { path: 'games', component: DashboardComponent },
    { path: 'games/:id', component: GamesComponent },
    { path: 'games/:id/reviews', component: ReviewsComponent },
    { path: 'reviews/:id/comments', component: CommentsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
