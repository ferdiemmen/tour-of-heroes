
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

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
import { PageListComponent } from './components/page-list/page-list.component';
import { MediaListComponent } from './components/media/media-list.component';
import { MediaResizedComponent } from './components/media/media-resized.component';
import { SnippetPickerComponent } from './components/snippet-picker/snippet-picker.component';
import { SnippetImageComponent } from './components/snippet/snippet-image/snippet-image.component';
import { SnippetParagraphComponent } from './components/snippet/snippet-paragraph/snippet-paragraph.component';
import { SnippetHeaderComponent } from './components/snippet/snippet-header/snippet-header.component';
import { SnippetQuoteComponent } from './components/snippet/snippet-quote/snippet-quote.component';
import { SnippetIframeComponent } from './components/snippet/snippet-iframe/snippet-iframe.component';
import { SnippetYoutubeComponent } from './components/snippet/snippet-youtube/snippet-youtube.component';
import { SnippetInstagramComponent } from './components/snippet/snippet-instagram/snippet-instagram.component';

import { ArticleService } from './components/article/article.service';
import { AuthorService } from './components/author/author.service';
import { CategoryService } from './components/category/category.service';
import { MediaService } from './components/media/media.service';
import { DeferredService } from './components/deferred/deferred.service';
import { FeedService } from './components/feed/feed.service';
import { SiteService } from './components/site/site.service';
import { UserService } from './components/user/user.service';
import { ConfigService } from './app-config.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
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
    PageListComponent,
    MediaListComponent,
    MediaResizedComponent,
    DashboardComponent,
    SnippetPickerComponent,
    SnippetImageComponent,
    SnippetParagraphComponent,
    SnippetHeaderComponent,
    SnippetQuoteComponent,
    SnippetIframeComponent,
    SnippetYoutubeComponent,
    SnippetInstagramComponent
  ],
  providers: [
    ApiService,
    ArticleService,
    CategoryService,
    MediaService,
    DeferredService,
    FeedService,
    SiteService,
    AuthorService,
    CacheService,
    UserService,
    ConfigService,
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
