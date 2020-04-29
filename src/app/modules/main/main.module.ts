import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMainComponent } from './app-main/app-main.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { AppComponent } from 'src/app/app.component';
import { MainRoutingModule } from './main-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ResumirPipe } from 'src/app/core/pipes/resumir.pipe';
import { FoodService } from 'src/app/core/services/food.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@NgModule({
  declarations: [
    AppMainComponent,
    CardapioComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    MainRoutingModule
  ],
  providers: [
    ResumirPipe,
    FoodService,
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class MainModule { }
