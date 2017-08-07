
import { Injectable, NgZone } from '@angular/core';

import * as moment from 'moment';

import { Block } from './block';
import { ApiService } from '../../api.service';
import { AreaService } from './area.service';
import { CacheService } from '../../cache.service';
import { DeferredService } from '../deferred/deferred.service';
import { SnippetService } from '../snippet/snippet.service';
import { PaginationService } from '../pagination/pagination.service';

declare var _rs: any;

const config = {
  paginationAmount: 35
}

@Injectable()
export class BlockService {
  public block: Block = new Block();
  public paginationService: PaginationService;

  private blocksUrl = 'modules/blocks'; // URL to web api
  private blocksSearchUrl = 'modules/search/blocks'; // URL to search web api

  constructor(
    public deferredService: DeferredService,
    public areaService: AreaService,
    public snippetService: SnippetService,
    private apiService: ApiService,
    private _ngZone: NgZone,
    private cacheService: CacheService) {
      this.snippetService = new SnippetService(this._ngZone);
      this.paginationService = new PaginationService();
    }

  getBlock(id: number): Promise<Block> {
    const url = `${this.blocksUrl}/${id}/`;
    const cacheKey = `block_${id}`;

    if (!id) {
      if (!this.deferredService.get()) {

        // Clear previous Block instance on service.
        this.block = new Block();
        this.snippetService.setSnippets([]);
      }

      return Promise.resolve(this.block as Block);
    } else {

      // Clear previous Block instance on service.
      this.block = new Block();
      this.snippetService.setSnippets([]);
      this.deferredService.reset();
    }

    // Check if a cached version exist and return it.
    if (this.cacheService.checkCacheKey(cacheKey)) {

      this.block = this.cacheService.getCache(cacheKey);
      this.snippetService.setSnippets(this.block.snippetsJson);

      return Promise.resolve(this.block as Block);
    }

    return this.apiService
      .get(url)
      .then(response => {

        // Set block on this service.
        this.block = response.json() as Block;
        this.snippetService.setSnippets(this.block.snippetsJson);

        // Add response to cache.
        this.cacheService.setCache(cacheKey, response.json() as Block);

        return this.block as Block;
      });
  }

  create(): Promise<Block> {
    const url = `${this.blocksUrl}/`;

    return this.apiService
      .put(url, this.block)
      .then(response => {
        const cacheKey = `block_${response.json().id}`;
        this.cacheService.setCache(cacheKey, response.json() as Block);

        // Add block to cached blocks.
        this.cacheService.clearCache('blocks');

        return response.json() as Block;
      });
  }

  update(): Promise<Block> {
    const url = `${this.blocksUrl}/${this.block.id}/`;

    return this.apiService
      .post(url, this.block)
      .then(response => {

        this.block = response.json() as Block;

        // Update block in cached blocks.
        this.cacheService
          .updateObject(`block_${this.block.id}`, this.block);

        return response;
      })
  }

  updateDateTime(property: string, value: any): void {
    const date = moment(value).format();
    this.updateProperty(property, date);
  }

  updateProperty(property: string, value: any): void {
    this.block[property] = value;
    this.cacheService.updateObject(`block_${this.block.id}`, this.block);
  }

  hasProperty(property, value): boolean {
    if (!this.block[property]) { return false; }

    return this.block[property].some(o => {
      if (o.id === value.id) {
        return true;
      }
      return false;
    });
  }

  toggleProperty(property: string, obj: object) {
    if (!this.block[property]) { this.block[property] = [] }

    // Toggle a property on the block.
    if (this.block[property].findIndex(el => el.id === obj['id']) !== -1) {
      this.block[property].splice([this.block[property].findIndex(el => el.id === obj['id'])], 1);
    } else {
      this.block[property].push(obj);
    }
  }
}
