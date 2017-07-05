import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'cms',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent },
          { path: 'article-list', component: ArticleListComponent },
          { path: 'article/create', component: ArticleComponent },
          { path: 'article/edit/:id', component: ArticleComponent },
          { path: 'detail/:id', component: HeroDetailComponent },
          { path: 'heroes', component: HeroesComponent }
        ],
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/cms',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
