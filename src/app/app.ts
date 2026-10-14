import { Component, computed } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FavoritosService } from './services/favoritos.service';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly favoritosCount;

  constructor(private readonly favoritosService: FavoritosService) {
    this.favoritosCount = computed(() => this.favoritosService.favoritos().length);
  }
}
