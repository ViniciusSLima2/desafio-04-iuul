import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListarMoedasComponent } from './pages/listar-moedas/listar-moedas.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'listarMoedas', component: ListarMoedasComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
];
