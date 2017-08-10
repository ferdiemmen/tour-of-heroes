
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import * as moment from 'moment';
moment.locale('nl');

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

// Imports from third party components
import { MediumEditorDirective } from 'angular2-medium-editor/medium-editor.directive';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { HotkeyModule } from 'angular2-hotkeys';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { AuthenticationComponent } from './components/user/authentication.component';
import { AuthGuard } from './auth-guard.service';
import { CacheService } from './cache.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadingService } from './loading.service';
import { PasswordResetComponent } from './components/user/password-reset.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { MultiplyPipe } from './pipes/multiply.pipe';

import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article/article-list.component';
import { BlockComponent } from './components/block/block.component';
import { BlockListComponent } from './components/block/block-list.component';
import { MediaListComponent } from './components/media/media-list.component';
import { MediaResizedComponent } from './components/media/media-resized.component';
import { MediaAlignComponent } from './components/media/media-align.component';
import { PageListComponent } from './components/page/page-list.component';
import { ProductListComponent } from './components/product/product-list.component';
import { SeoComponent } from './components/seo/seo.component';
import { SearchComponent } from './components/search/search.component';
import { SnippetsComponent } from './components/snippet/snippet.component';
import { SnippetPickerComponent } from './components/snippet-picker/snippet-picker.component';
import { SnippetImageComponent } from './components/snippet/snippet-image/snippet-image.component';
import { SnippetParagraphComponent } from './components/snippet/snippet-paragraph/snippet-paragraph.component';
import { SnippetHeaderComponent } from './components/snippet/snippet-header/snippet-header.component';
import { SnippetQuoteComponent } from './components/snippet/snippet-quote/snippet-quote.component';
import { SnippetIframeComponent } from './components/snippet/snippet-iframe/snippet-iframe.component';
import { SnippetYoutubeComponent } from './components/snippet/snippet-youtube/snippet-youtube.component';
import { SnippetInstagramComponent } from './components/snippet/snippet-instagram/snippet-instagram.component';
import { SnippetTwitterComponent } from './components/snippet/snippet-twitter/snippet-twitter.component';
import { SnippetTwitchComponent } from './components/snippet/snippet-twitch/snippet-twitch.component';
import { SnippetPagebreakComponent } from './components/snippet/snippet-pagebreak/snippet-pagebreak.component';
import { SnippetHtmlComponent } from './components/snippet/snippet-html/snippet-html.component';
import { SnippetListComponent } from './components/snippet/snippet-list/snippet-list.component';
import { SnippetContainerComponent } from './components/snippet/snippet-container/snippet-container.component';
import { SnippetReviewComponent } from './components/snippet/snippet-review/snippet-review.component';
import { SnippetKieskeurigComponent } from './components/snippet/snippet-kieskeurig/snippet-kieskeurig.component';

import { ArticleService } from './components/article/article.service';
import { AuthorService } from './components/author/author.service';
import { BlockService } from './components/block/block.service';
import { AreaService } from './components/block/area.service';
import { CategoryService } from './components/category/category.service';
import { MediaService } from './components/media/media.service';
import { DeferredService } from './components/deferred/deferred.service';
import { FeedService } from './components/feed/feed.service';
import { SiteService } from './components/site/site.service';
import { UserService } from './components/user/user.service';
import { SnippetService } from './components/snippet/snippet.service';
import { PaginationService } from './components/pagination/pagination.service';
import { ProductService } from './components/product/product.service';
import { ConfigService } from './app-config.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    DateTimePickerModule,
    FormsModule,
    HttpModule,
    HotkeyModule.forRoot(),
    JsonpModule,
    ReactiveFormsModule
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ArticleComponent,
    ArticleListComponent,
    BlockComponent,
    BlockListComponent,
    DashboardComponent,
    PageListComponent,
    MediumEditorDirective,
    MediaListComponent,
    MediaResizedComponent,
    MediaAlignComponent,
    PasswordResetComponent,
    PaginationComponent,
    ProductListComponent,
    SearchComponent,
    SeoComponent,
    SnippetsComponent,
    SnippetPickerComponent,
    SnippetImageComponent,
    SnippetParagraphComponent,
    SnippetHeaderComponent,
    SnippetQuoteComponent,
    SnippetIframeComponent,
    SnippetYoutubeComponent,
    SnippetInstagramComponent,
    SnippetTwitterComponent,
    SnippetTwitchComponent,
    SnippetPagebreakComponent,
    SnippetHtmlComponent,
    SnippetListComponent,
    SnippetContainerComponent,
    SnippetReviewComponent,
    SnippetKieskeurigComponent,
    ToolbarComponent,

    // Pipes
    CapitalizePipe,
    MultiplyPipe
  ],
  providers: [
    ApiService,
    AreaService,
    ArticleService,
    BlockService,
    CategoryService,
    MediaService,
    DeferredService,
    FeedService,
    LoadingService,
    SiteService,
    AuthorService,
    CacheService,
    UserService,
    ConfigService,
    SnippetService,
    PaginationService,
    ProductService,
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
