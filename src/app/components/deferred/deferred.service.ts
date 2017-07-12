
import { Injectable } from '@angular/core';

import { Deferred } from './deferred';
import { ApiService } from '../../api.service';
import { CacheService } from '../../cache.service';


@Injectable()
export class DeferredService {
  private deferred: Deferred<any>;

  get(): Deferred<any> {
    return this.deferred;
  }

  set(): Promise<any> {
    this.deferred = new Deferred<any>();
    return this.deferred.promise;
  }

  resolve(value: any): any {
    this.deferred.resolve(value);
  }

  reset() {
    this.deferred = null;
  }
}
