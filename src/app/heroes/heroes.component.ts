import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

// OnInitのimplementsはマナー、ngOnInitの実装が必須になる
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  // コンストラクターではプロパティ定義などの簡単な初期化のみを行う
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getHeros();
  }

  // サービスからheroesをサブスクライブ
  getHeros() {
    this.heroService
      .getHeroes()
      // サービスの取得結果を変数に入れる
      .subscribe((heroes) => (this.heroes = heroes));

    // 修正前
    // this.heroes = this.heroService.getHeroes();
  }

  // buttonクリック時に送られてきたheroを使用する
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected heroId = ${hero.id}`);
  }
}
