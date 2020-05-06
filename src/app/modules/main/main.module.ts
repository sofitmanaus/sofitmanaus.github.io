import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AppMainComponent } from './app-main/app-main.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { AppComponent } from 'src/app/app.component';
import { MainRoutingModule } from './main-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ResumirPipe } from 'src/app/core/pipes/resumir.pipe';
import { FoodService } from 'src/app/core/services/food.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MapComponent } from './map/map.component';
import { MapService } from 'src/app/core/services/map.service';
import { FormsModule } from '@angular/forms';
import { CardapioHeaderComponent } from './cardapio-header/cardapio-header.component';
@NgModule({

  declarations: [
    AppMainComponent,
    CardapioComponent,
    MapComponent,
    CardapioHeaderComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    MainRoutingModule,
    LazyLoadImageModule,
    FormsModule
  ],
  providers: [
    ResumirPipe,
    FoodService,
    FirestoreService,
    CurrencyPipe,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class MainModule { }
