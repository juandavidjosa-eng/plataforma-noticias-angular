import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritosService, type Noticia } from '../../services/favoritos.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  noticias: Noticia[] = [];

  constructor(private readonly favoritosService: FavoritosService) {
    this.noticias = this.favoritosService.catalogo;
  }

  toggleFavorito(noticia: Noticia): void {
    this.favoritosService.toggleFavorito(noticia);
  }

  esFavorita(id: number): boolean {
    return this.favoritosService.estaGuardada(id);
  }
}