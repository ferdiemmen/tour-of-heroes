
import { File } from './file';

export class Media {
  id: number;
  file: File;

  constructor(file: any) {
    this.file = file;
  }
}
