import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'warrior' },
      { id: 2, name: 'thief' },
      { id: 3, name: 'robot' },
      { id: 4, name: 'inventor' },
      { id: 5, name: 'witch' },
      { id: 6, name: 'jester' },
    ];
    return { heroes: heroes };
  }

  // 配列が空ならIDに初期値11をセット、それ以外は新規ID採番
  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map((hero) => hero.id)) + 1 : 11;
  }
}
