
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';

import * as $ from 'jquery';

import { Media } from './media';
import { ApiService } from '../../api.service';
import { DeferredService } from '../deferred/deferred.service';
import { CacheService } from '../../cache.service';
import { PaginationService } from '../pagination/pagination.service';

declare var _rs: any;

const config = {
  mediaUrl: 'modules/media/',
  mediaSearchUrl: 'modules/search/images/'
};

@Injectable()
export class MediaService {
  public media: Media;
  public mediaObjects: Media[];
  public edit: boolean = false;
  private mediaUrl = config.mediaUrl; // URL to web api

  constructor(
    public deferredService: DeferredService,
    public paginationService: PaginationService,
    private _hotkeysService: HotkeysService,
    private apiService: ApiService,
    private router: Router,
    private location: Location,
    private cacheService: CacheService) {
      this.paginationService = new PaginationService();

      this._hotkeysService.add(new Hotkey(['esc'], (event: KeyboardEvent, combo: string): ExtendedKeyboardEvent => {
        this.reset();

        event.returnValue = false; // Prevent bubbling
        return event;
      }));
    }

  getMedia(id: number): Promise<Media> {
    const url = `${this.mediaUrl}${id}/`;
    return this.apiService
      .get(url)
      .then(response => this.media = response.json() as Media);
  }

  getMediaObjects(type: string, page?: number, query?: string): Promise<Media[]> {
    let url = `${this.mediaUrl}${type}/?sort=true&details=true`;
    let cacheKey = (page) ? `mediaobjects_${page}` : 'mediaobjects_1';

    if (query) {
      url = `${config.mediaSearchUrl}/?q=${query}`;
      cacheKey = `${cacheKey}_${query}`;
    }

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      const cachedData = this.cacheService.getCache(cacheKey);
      this.mediaObjects = cachedData.results;
      this.paginationService.setupPagination(cachedData.page, cachedData.numPages);
      return Promise.resolve(cachedData.results);
    }

    if (page) {
      url += '&page=' + page;
    }

    return this.apiService
      .get(url)
      .then(response => {
        const data = response.json();
        data.results = this.wrapFilesInMedia(data.results) as Media[];

        // Set cache for media objects.
        this.cacheService.setCache(cacheKey, data);

        this.paginationService.setupPagination(data.page, data.numPages);

        this.mediaObjects = data.results;
        return data.results;
      });
  }

  getResizedImage(media: Media, width: number, height: number, crop: string): string {
    if (!media.file) { return ''; }

    let url = `${_rs.apiUrl}/${this.mediaUrl}show_image/${media.file.id}/?width=${width}&crop=${crop}`;
    if (height) { url += `&height=${height}`};
    return url;
  }

  selectedMedia(media: Media): void {
    this.edit = true;

    if (!window.event['shiftKey'] && !window.event['ctrlKey'] && !window.event['metaKey']) {
      if (media['active']) {
        media['active'] = false;
        this.reset();
      } else {
        this.mediaObjects.map(m => m['active'] = false);
        media['active'] = true;
        this.getMedia(media.file['mediaId']);
      }
    } else {
      if (media['active']) {
        media['active'] = false;
        if (!this.mediaObjects.filter(m => { if (m['active']) { return true; } }).length) {
          this.reset();
        }
      } else {
        media['active'] = true;
        this.getMedia(media.file['mediaId']);
      }
    }

    if (!this.deferredService.get()) { return; }
    this.reset();
    this.deferredService.resolve(media);
    this.deferredService = new DeferredService();
    this.location.back();
  }

  pickMedia(): Promise<Media> {
    this.router.navigate(['/cms/media-list']);
    return this.deferredService.set();
  }

  upload(data): void {
    const url = `${_rs.apiUrl}/${config.mediaUrl}image/`;
    this.apiService.upload(url, data)
      .done(response => {
        this.mediaObjects.unshift(this.wrapFilesInMedia([response])[0] as Media)
      });
  }

  save(): void {

    this.mediaObjects.map(m => {
      if (!m['active']) { return; }

      const media = $.extend(true, {}, m, this.media);
      media.id = m.file.mediaId;
      const url = `${config.mediaUrl}${media.id}/`;

      this.apiService.put(url, media)
        .then(response => {
          this.reset();
        });
    });
  }

  remove(): void {
    const id = this.media.id;
    const url = `${config.mediaUrl}${id}/`;

    // Remove media from mediaObjects.
    this.mediaObjects = this.mediaObjects.filter(m => m.file.mediaId !== this.media.id);

    this.apiService.destroy(url)
      .then(response => {
        this.reset();
      });
  }

  reset(): void {
    this.edit = false;
    this.media = null;
    this.mediaObjects.map(m => m['active'] = false);
  }

  /**
   * Wraps an array of File objects in a Media object.
   * @param { Array } data - An array containing File objects.
   * @returns { Array } mediaArray - An array containing Media objects.
   */
  private wrapFilesInMedia(data: File[]): Media[] {
    const mediaArray: Media[] = [];
    data.map(i => {
      mediaArray.push(new Media(i));
    });
    return mediaArray;
  }
}
