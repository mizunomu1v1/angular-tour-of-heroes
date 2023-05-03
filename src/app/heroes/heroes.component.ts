import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

// OnInitのimplementsはマナー、ngOnInitの実装が必須になる
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  // コンストラクターではプロパティ定義などの簡単な初期化のみを行う
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeros();
  }

  // サービスからheroesをサブスクライブ
  getHeros() {
    this.heroService
      .getHeroes()
      // サービスの取得結果を変数に入れる
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
