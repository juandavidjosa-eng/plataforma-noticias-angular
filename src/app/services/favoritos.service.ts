import { Injectable, signal } from '@angular/core';

export interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  descripcion_corta: string;
  imagen: string;
}

export interface NoticiaDetalle extends Noticia {
  autor: string;
  fecha: string;
  parrafo1: string;
  parrafo2: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private readonly storageKey = 'noticias-favoritas';
  private readonly favoritosSignal = signal<Noticia[]>(this.leerFavoritos());

  readonly favoritos = this.favoritosSignal.asReadonly();

  readonly catalogo: NoticiaDetalle[] = [
    {
      id: 1,
      categoria: 'ECONOMÍA GLOBAL',
      titulo: 'La transición hacia las energías renovables acelera el crecimiento industrial',
      descripcion_corta: 'El panorama energético europeo está experimentando un cambio estructural sin precedentes impulsado por las recientes políticas.',
      imagen: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
      autor: 'Redacción Economía',
      fecha: '13 de Octubre, 2026',
      parrafo1: 'El panorama energético europeo está experimentando un cambio estructural sin precedentes impulsado por las recientes políticas. La inversión en infraestructuras verdes ha roto récords este trimestre.',
      parrafo2: 'Además, estas nuevas políticas han fomentado la creación de miles de empleos directos e indirectos, mejorando la eficiencia energética a nivel global. Las proyecciones indican que para 2030, más del 50% de la energía consumida provendrá de fuentes totalmente renovables.'
    },
    {
      id: 2,
      categoria: 'TECNOLOGÍA',
      titulo: 'Sistemas avanzados de inteligencia artificial aplicados al diagnóstico médico',
      descripcion_corta: 'Hospitales inician proyectos piloto logrando reducir a la mitad los tiempos de detección temprana en patologías complejas.',
      imagen: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=800&q=80',
      autor: 'Redacción Tecnología',
      fecha: '15 de Octubre, 2026',
      parrafo1: 'Los hospitales están integrando modelos de IA para interpretar radiografías y analizar grandes volúmenes de datos clínicos en segundos, reduciendo tiempos de respuesta en casos críticos.',
      parrafo2: 'Los especialistas destacan que la combinación entre inteligencia artificial y criterio médico humano puede aumentar la precisión diagnóstica, especialmente en patologías complejas y de evolución rápida.'
    },
    {
      id: 3,
      categoria: 'SOCIEDAD',
      titulo: 'La revitalización demográfica en los pueblos del interior peninsular',
      descripcion_corta: 'Iniciativas comunitarias y conectividad digital atraen a una nueva generación de profesionales hacia entornos rurales.',
      imagen: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80',
      autor: 'Redacción Sociedad',
      fecha: '17 de Octubre, 2026',
      parrafo1: 'En varias localidades rurales se observa una recuperación sostenida de la población, impulsada por nuevas oportunidades laborales, vivienda asequible y mejora en conectividad digital.',
      parrafo2: 'Las iniciativas impulsadas por administraciones locales y entidades privadas están ayudando a recuperar la actividad económica, reforzando el tejido comunitario y atrayendo talento joven al territorio.'
    }
  ];

  obtenerDetalle(id: number): NoticiaDetalle {
    return this.catalogo.find((noticia) => noticia.id === id) ?? this.catalogo[0];
  }

  toggleFavorito(noticia: Noticia): boolean {
    const favoritosActuales = this.leerFavoritos();
    const yaExiste = favoritosActuales.some((item) => item.id === noticia.id);

    const siguienteLista = yaExiste
      ? favoritosActuales.filter((item) => item.id !== noticia.id)
      : [...favoritosActuales, noticia];

    this.guardarFavoritos(siguienteLista);
    return !yaExiste;
  }

  estaGuardada(id: number): boolean {
    return this.favoritosSignal().some((noticia) => noticia.id === id);
  }

  private guardarFavoritos(favoritos: Noticia[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(favoritos));
    }

    this.favoritosSignal.set(favoritos);
  }

  private leerFavoritos(): Noticia[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const datos = localStorage.getItem(this.storageKey);

    if (!datos) {
      return [];
    }

    try {
      const parseado = JSON.parse(datos) as Noticia[];
      return Array.isArray(parseado) ? parseado : [];
    } catch {
      return [];
    }
  }
}
