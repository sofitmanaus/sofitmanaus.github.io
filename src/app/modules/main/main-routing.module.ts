import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MapComponent } from './map/map.component';
import { CardapioDetailsComponent } from './cardapio-details/cardapio-details.component';

const routes: Routes = [
    {
        path: 'app',
        data: {title: 'Início'},
        canActivate: [
        ],
        component: AppMainComponent,
        children: [
            { path: '', redirectTo: 'cardapio', pathMatch: 'full' },
            { path: '.', redirectTo: 'cardapio' },
            { path: 'cardapio', component: CardapioComponent, data: { title: 'Cardápio' } },
            { path: 'cardapio/:id', component: CardapioDetailsComponent, data: { title: 'Detalhes do Produto' } },
            { path: 'map', component: MapComponent, data: { title: 'Mapa' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
