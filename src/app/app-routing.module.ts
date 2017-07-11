import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationComponent } from './components/user/authentication.component';
import { PasswordResetComponent } from './components/user/password-reset.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { MediaListComponent } from './components/media/media-list.component';

const routes: Routes = [
  { path: 'cms',
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent, canActivate: [AuthGuard], },
          { path: 'login', component: AuthenticationComponent },
          { path: 'password-reset', component: PasswordResetComponent },
          { path: 'article-list', component: ArticleListComponent, canActivate: [AuthGuard], },
          { path: 'page-list', component: PageListComponent, canActivate: [AuthGuard], },
          { path: 'media-list', component: MediaListComponent, canActivate: [AuthGuard], },
          { path: 'article/create', component: ArticleComponent, canActivate: [AuthGuard], },
          { path: 'article/edit/:id', component: ArticleComponent, canActivate: [AuthGuard], }
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
