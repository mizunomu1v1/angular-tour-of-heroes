import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROS } from '../mock-heros';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes = HEROS;
  selectedHero?: Hero;
  // 送られてきたheroをselectedHeroに格納
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
