import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationComponent } from './components/user/authentication.component';
import { PasswordResetComponent } from './components/user/password-reset.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article/article-list.component';
import { BlockComponent } from './components/block/block.component';
import { BlockListComponent } from './components/block/block-list.component';
import { PageListComponent } from './components/page/page-list.component';
import { ProductListComponent } from './components/product/product-list.component';
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
          { path: 'media-list', component: MediaListComponent },
          { path: 'article/create', component: ArticleComponent },
          { path: 'article/edit/:id', component: ArticleComponent },
          { path: 'article-list', component: ArticleListComponent },
          { path: 'page/create', component: ArticleComponent },
          { path: 'page/edit/:id', component: ArticleComponent },
          { path: 'page-list', component: PageListComponent },
          { path: 'block/create', component: BlockComponent },
          { path: 'block/edit/:id', component: BlockComponent },
          { path: 'block-list', component: BlockListComponent },
          { path: 'product-list', component: ProductListComponent }
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
