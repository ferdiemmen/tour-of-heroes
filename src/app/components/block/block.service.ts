
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
    private _apiService: ApiService,
    private _ngZone: NgZone,
    private _cacheService: CacheService) {
      this.snippetService = new SnippetService(this._ngZone);
      this.paginationService = new PaginationService();
    }

  get(id: number): Promise<Block> {
    const url = `${this.blocksUrl}/${id}/`;
    const cacheKey = `block_${id}`;

    if (!id) {
      if (!this.deferredService.get()) {

        // Clear previous Block instance on service.
        this.block = new Block();
        this.snippetService.setSnippets([]);

        // Set defaults for block.
        this._setDefaults();
      }

      return Promise.resolve(this.block as Block);
    } else {

      // Clear previous Block instance on service.
      this.block = new Block();
      this.snippetService.setSnippets([]);
      this.deferredService.reset();
    }

    return this._apiService
      .get(url)
      .then(response => {

        // Set block on this service.
        this.block = response.json() as Block;
        this.snippetService.setSnippets(this.block.snippetsJson);
        this._setDefaults();

        return this.block as Block;
      });
  }

  create(): Promise<Block> {
    const url = `${this.blocksUrl}/`;

    this._cacheService.clearCache('areas');

    return this._apiService
      .put(url, this.block)
      .then(response => response.json() as Block);
  }

  update(): Promise<Block> {
    const url = `${this.blocksUrl}/${this.block.id}/`;

    this._cacheService.clearCache('areas');

    return this._apiService
      .post(url, this.block);
  }

  remove(): Promise<void> {
    const url = `${this.blocksUrl}/${this.block.id}/`;

    this._cacheService.clearCache('areas');

    return this._apiService
      .destroy(url);
  }

  updateDateTime(property: string, value: any): void {
    const date = moment(value).format();
    this.updateProperty(property, date);
  }

  updateProperty(property: string, value: any): void {
    this.block[property] = value;
    this._cacheService.updateObject(`block_${this.block.id}`, this.block);
  }

  private _setDefaults(): void {

    // Get areas. Set the defaults for this block.
    this.areaService.get().then(_ => this._setDefault('area'));
  }

  private _setDefault(property: string): void {
    switch (property) {
      case 'area':
        // A new article doesn't have a author by default. After we got
        // all the authors we set it to the site's default author.
        const blockArea = this.block.area || 1;
        this.block[property] = this.areaService.areas
                                                  .find(a => a.id === blockArea);
        break;
      default:
        break;
    }
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
