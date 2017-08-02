
import { File } from './file';

export class Media {
  id: number;
  file: File;
  name: string;
  tags: string;
  source: string;
  sourceLink: string;
  copyright: string;
  altText: string;
  description: string;

  constructor(file: any) {
    this.file = file;
  }
}
