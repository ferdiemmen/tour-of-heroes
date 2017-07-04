
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MediumEditorDirective } from 'angular2-medium-editor/medium-editor.directive';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleService } from './components/article/article.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.compontent';
import { CacheService } from './cache.service';
import { HeroService } from './components/hero/hero.service';
import { HeroSearchService } from './components/hero-search/hero-search.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
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
    HeroService,
    HeroSearchService,
    CacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
