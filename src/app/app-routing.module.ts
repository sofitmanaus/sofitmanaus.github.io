import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainRoutingModule } from './modules/main/main-routing.module';
import { AccessControlRoutingModule } from './modules/access-control/access-control-routing.module';


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
      AccessControlRoutingModule,
      MainRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

