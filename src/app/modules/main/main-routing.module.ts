import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { CardapioComponent } from './cardapio/cardapio.component';

const routes: Routes = [
    {
        path: 'app',
        component: AppMainComponent,
        children: [
            { path: '', redirectTo: 'cardapio', pathMatch: 'full' },
            { path: '.', redirectTo: 'cardapio' },
            { path: 'cardapio', component: CardapioComponent, data: { title: 'Cardápio' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
