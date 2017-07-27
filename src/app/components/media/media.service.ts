
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Media } from './media';
import { ApiService } from '../../api.service';
import { DeferredService } from '../deferred/deferred.service';
import { CacheService } from '../../cache.service';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class MediaService {
  public media: Media;
  public mediaObjects: Media[];

  private mediaUrl = 'modules/media/'; // URL to web api

  constructor(
    public deferredService: DeferredService,
    public paginationService: PaginationService,
    private apiService: ApiService,
    private router: Router,
    private location: Location,
    private cacheService: CacheService) {
      this.paginationService = new PaginationService();
    }

  getMedia(id: number): Promise<Media> {
    const url = `${this.mediaUrl}${id}/`;
    return this.apiService
      .get(url)
      .then(response => this.media = response.json() as Media);
  }

  getMediaObjects(type: string, page?: number): Promise<Media[]> {
    let url = `${this.mediaUrl}${type}/?sort=true&details=true`;
    const cacheKey = (page) ? `mediaobjects_${page}` : 'mediaobjects_1';


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

    let url = `https://localapi.reshift.nl:8001/${this.mediaUrl}show_image/${media.file.id}/?width=${width}&crop=${crop}`;
    if (height) { url += `&height=${height}`};
    return url;
  }

  selectedMedia(media: Media): void {
    if (!this.deferredService.get()) { return; }
    this.media = media;
    this.deferredService.resolve(media);
    this.location.back();
  }

  pickMedia(): Promise<Media> {
    this.router.navigate(['/cms/media-list', {queryParams: {type: 'images'}}]);
    return this.deferredService.set();
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
