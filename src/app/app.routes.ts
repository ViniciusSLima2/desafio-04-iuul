import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListarMoedasComponent } from './pages/listar-moedas/listar-moedas.component';
import { ConversorComponent } from './pages/conversor/conversor.component';
import { HistoricoComponent } from './pages/historico/historico.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'listarMoedas', component: ListarMoedasComponent },
    { path: 'conversor', component: ConversorComponent },
    { path: 'historico', component: HistoricoComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
];
