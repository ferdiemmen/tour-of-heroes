
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
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleService } from './components/article/article.service';

import { AuthorService } from './components/author/author.service';
import { CategoryService } from './components/category/category.service';
import { FeedService } from './components/feed/feed.service';
import { SiteService } from './components/site/site.service';

import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.compontent';
import { HeroService } from './components/hero/hero.service';
import { HeroSearchService } from './components/hero-search/hero-search.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    DateTimePickerModule
  ],
  declarations: [
    MediumEditorDirective,
    AppComponent,
    ToolbarComponent,
    ArticleComponent,
    ArticleListComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent
  ],
  providers: [
    ApiService,
    ArticleService,
    CategoryService,
    FeedService,
    SiteService,
    AuthorService,
    HeroService,
    HeroSearchService,
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
