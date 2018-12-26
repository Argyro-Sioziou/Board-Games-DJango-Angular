import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games/games.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewsComponent } from './reviews/reviews.component';
import {CommentsComponent} from './comments/comments.component';

const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full' },
    { path: 'games', component: DashboardComponent },
    { path: 'games/:id', component: GamesComponent },
    { path: 'games/:id/reviews', component: ReviewsComponent },
    { path: 'reviews/:id/comments', component: CommentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
