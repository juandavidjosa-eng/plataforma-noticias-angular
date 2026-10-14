import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FavoritosService, type NoticiaDetalle } from '../../services/favoritos.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {
  noticia!: NoticiaDetalle;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = Number(params.get('id') ?? '1');
      this.noticia = this.favoritosService.obtenerDetalle(idParam);
    });
  }

  toggleFavorito(): void {
    this.favoritosService.toggleFavorito({
      id: this.noticia.id,
      categoria: this.noticia.categoria,
      titulo: this.noticia.titulo,
      descripcion_corta: this.noticia.descripcion_corta,
      imagen: this.noticia.imagen
    });
  }

  esFavorita(): boolean {
    return this.favoritosService.estaGuardada(this.noticia.id);
  }
}