
import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const articles = [
      { id: 0, title: 'Zero' },
      { id: 11, title: 'Mr. Nice' },
      { id: 12, title: 'Narco' },
      { id: 13, title: 'Bombasto' },
      { id: 14, title: 'Celeritas' },
      { id: 15, title: 'Magneta' },
      { id: 16, title: 'RubberMan' },
      { id: 17, title: 'Dynama' },
      { id: 18, title: 'Dr IQ' },
      { id: 19, title: 'Magma' },
      { id: 20, title: 'Tornado' }
    ];
    return {articles};
  }
}
