
import { Injectable } from '@angular/core';

import { Media } from './media';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class MediaService {
  public media: Media;
  public mediaObjects: Media[];

  private mediaUrl = 'modules/media/'; // URL to web api

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService) { }

  getMedia(id: number): Promise<Media> {
    const url = `${this.mediaUrl}/${id}/`;
    return this.apiService
      .get(url)
      .then(response => this.media = response.json() as Media);
  }

  getMediaObjects(type: string): Promise<Media[]> {
    const url = `${this.mediaUrl}/${type}/`;
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
    return `https://localapi.reshift.nl:8001/${this.mediaUrl}show_image/${media.file.id}/?width=200&height=200&crop=center`;
  }

  /**
   * Wraps an array of File objects in a Media object.
   * @param { Array } data - An array containing File objects.
   * @returns { Array } mediaArray - An array containing Media objects.
   */
  private wrapFilesInMedia(data: File[]): Media[] {
    let mediaArray: Media[] = [];
    data.map(i => {
      mediaArray.push(new Media(i));
    });
    return mediaArray;
  }
}
