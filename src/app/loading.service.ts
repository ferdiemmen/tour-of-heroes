import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  public loading: boolean = false;

  set(value: boolean): void {
    this.loading = value || false;
  }
}
