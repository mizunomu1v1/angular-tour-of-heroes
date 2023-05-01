import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  // コンストラクターではプロパティ定義などの簡単な初期化のみを行う
  constructor(private heroService: HeroService) {}

  ngOnInit(){
    this.getHeros();
  }

  // サービスからheroesを取得
  getHeros() {
    this.heroes = this.heroService.getHeroes();
  }

  // 送られてきたheroをselectedHeroに格納
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
