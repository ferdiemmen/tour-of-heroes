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
    // runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent, },
          { path: 'article-list', component: ArticleListComponent },
          { path: 'page-list', component: PageListComponent },
          { path: 'media-list', component: MediaListComponent },
          { path: 'article/create', component: ArticleComponent },
          { path: 'article/edit/:id', component: ArticleComponent },
          { path: 'page/create', component: ArticleComponent },
          { path: 'page/edit/:id', component: ArticleComponent }
        ],
      }
    ]
  },
  { path: 'cms/login', component: AuthenticationComponent },
  { path: 'cms/password-reset', component: PasswordResetComponent },
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
