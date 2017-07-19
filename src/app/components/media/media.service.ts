
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Media } from './media';
import { ApiService } from '../../api.service';
import { DeferredService } from '../deferred/deferred.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class MediaService {
  public media: Media;
  public mediaObjects: Media[];

  private mediaUrl = 'modules/media/'; // URL to web api

  constructor(
    public deferredService: DeferredService,
    private apiService: ApiService,
    private router: Router,
    private location: Location,
    private cacheService: CacheService) { }

  getMedia(id: number): Promise<Media> {
    const url = `${this.mediaUrl}${id}/`;
    return this.apiService
      .get(url)
      .then(response => this.media = response.json() as Media);
  }

  getMediaObjects(type: string): Promise<Media[]> {
    const url = `${this.mediaUrl}${type}/?sort=true&details=true`;
    const cacheKey = 'mediaobjects';

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {
      return Promise.resolve(this.cacheService.getCache(cacheKey));
    }

    return this.apiService
      .get(url)
      .then(response => {
        this.mediaObjects = this.wrapFilesInMedia(response.json().results) as Media[];

        this.cacheService.setCache(cacheKey, this.mediaObjects);
        return this.mediaObjects;
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
    this.router.navigate(['/cms/media-list', {type: 'images'}]);
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
