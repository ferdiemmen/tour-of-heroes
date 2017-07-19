
export class Snippet {
  type: string;
  data: object;

  constructor(snippet) {
    this.type = snippet.type || null;
    this.data = snippet.data || null;
  }
}
