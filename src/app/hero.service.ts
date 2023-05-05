import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
   */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   *
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    // Observable<T>を返す正常な関数を返す
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // 空の結果を返す
      return of(result as T);
    };
  }

  /**
   * 全てのヒーローを取得する関数
   * @returns heroes - ヒーローの配列
   */
  getHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log(`fetched heroes`)),
      // 戻り値のOperatorFunctionはObservable を返す関数
      catchError(
        // エラー用にメッセージと空配列を渡す
        this.handleError<Hero[]>('getHeroes', [])
      )
    );
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
