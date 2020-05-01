import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from '../core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoaderComponent } from './loader/loader.component';
import { LoaderSectionComponent } from './loader-section/loader-section.component';

@NgModule({
  declarations: [
    FooterComponent,
    TopbarComponent,
    LoaderComponent,
    LoaderSectionComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  exports: [
    TopbarComponent,
    FooterComponent,
    LoaderComponent,
    LoaderSectionComponent
  ]
})
export class LayoutModule { }
