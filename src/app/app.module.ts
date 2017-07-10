
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Imports from third party components
import { MediumEditorDirective } from 'angular2-medium-editor/medium-editor.directive';
import { DateTimePickerModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { AuthGuard } from './auth-guard.service';
import { CacheService } from './cache.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationComponent } from './components/user/authentication.component';
import { PasswordResetComponent } from './components/user/password-reset.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleService } from './components/article/article.service';

import { AuthorService } from './components/author/author.service';
import { CategoryService } from './components/category/category.service';
import { FeedService } from './components/feed/feed.service';
import { SiteService } from './components/site/site.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    DateTimePickerModule
  ],
  declarations: [
    MediumEditorDirective,
    AppComponent,
    AuthenticationComponent,
    PasswordResetComponent,
    ToolbarComponent,
    ArticleComponent,
    ArticleListComponent,
    DashboardComponent
  ],
  providers: [
    ApiService,
    ArticleService,
    CategoryService,
    FeedService,
    SiteService,
    AuthorService,
    CacheService,
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
