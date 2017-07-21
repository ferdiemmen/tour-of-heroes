
export class Snippet {
  id: string;
  type: string;
  data: object;

  constructor(snippet) {
    this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    this.type = snippet.type || null;
    this.data = snippet.data || null;
  }
}
