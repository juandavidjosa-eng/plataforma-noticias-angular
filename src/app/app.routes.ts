import { Routes } from '@angular/router';
import { Catalogo } from './components/catalogo/catalogo';
import { Contacto } from './components/contacto/contacto';
import { Detalle } from './components/detalle/detalle';
import { Favoritos } from './components/favoritos/favoritos';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'favoritos', component: Favoritos },
  { path: 'detalle', component: Detalle },
  { path: 'detalle/:id', component: Detalle },
  { path: 'contacto', component: Contacto },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];