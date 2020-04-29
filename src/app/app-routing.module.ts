import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRoutingModule } from './modules/main/main-routing.module';


const routes: Routes = [
  { path: '**', redirectTo: 'app/cardapio' }
];

@NgModule({
  imports: [
      // RouterModule.forRoot(routes),

      RouterModule.forRoot(routes, {
          initialNavigation: 'enabled',
          paramsInheritanceStrategy: 'always'
      }),
      MainRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

