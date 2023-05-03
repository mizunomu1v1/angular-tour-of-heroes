import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { HEROS } from './mock-heros';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  // サービス内でサービスを利用する
  constructor(private http: HttpClient, private messageService: MessageService) {}

  /**
   * HeroServiceのメッセージをMessageServiceを使って記録する
   * @returns message - メッセージ
   */ private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * 全てのヒーローを取得する関数
   * @returns heroes - ヒーローの配列
   */
  getHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl);
    this.log(`fetched heroes`);
    return heroes;
  }

  /**
   * ヒーローを取得する関数
   * @param id - ヒーローID
   * @returns hero - ヒーロー
   */
  getHero(id: number): Observable<Hero> {
    const hero = HEROS.find((hero) => hero.id === id)!;
    this.log(`fetched heroId = ${id}`);
    return of(hero);
  }
}
