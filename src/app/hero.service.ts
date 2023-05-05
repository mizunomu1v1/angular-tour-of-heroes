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
  // HTTPの保存リクエスト保存時のヘッダー
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // サービス内でサービスを利用する
  constructor(private http: HttpClient, private messageService: MessageService) {}

  /**
   * HeroServiceのメッセージをMessageServiceを使って記録する
   * @param message - メッセージ
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
   * @returns Observable<Hero[]>
   */
  getHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log(`fetched heroes`)),
      // 戻り値のOperatorFunctionはObservableを返す関数
      catchError(
        // エラー用にメッセージと空配列を渡す
        this.handleError<Hero[]>('getHeroes', [])
      )
    );
    return heroes;
  }

  /**
   * idからヒーローを取得する関数
   * @param id - ヒーローID
   * @returns  Observable<Hero>
   */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(() => this.log(`fetched heroId = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id} `))
    );
  }

  /**
   * ヒーローを更新する関数
   * @param hero - ヒーロー
   * @returns  Observable<Object>
   */
  updateHero(hero: Hero): Observable<Object> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<Object>(`updateHero`))
    );
  }
}
