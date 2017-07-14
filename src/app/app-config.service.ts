
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private config: Object;

  constructor() {
    this.config = {};
  }

  setProperty(key: any, value: any): void {
    this.config[key] = value;
  }

  getProperty(key: any): any {
    if (!this.config[key]) { return false }
    return this.config[key];
  }

  removeProperty(key: any): void {
    delete this.config[key];
  }
}
