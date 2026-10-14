import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritosService, type Noticia } from '../../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favoritos.html'
})
export class Favoritos {
  readonly favoritos;

  constructor(private readonly favoritosService: FavoritosService) {
    this.favoritos = this.favoritosService.favoritos;
  }

  quitarFavorito(noticia: Noticia): void {
    this.favoritosService.toggleFavorito(noticia);
  }
}
