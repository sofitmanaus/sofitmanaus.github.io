import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { MainModule } from './modules/main/main.module';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage"
import { environment } from 'src/environments/environment';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AccessControlModule } from './modules/access-control/access-control.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'drhhv4pjk'}),
    LazyLoadImageModule,
    FormsModule,
    HttpClientModule,

    // App modules
    CoreModule,
    LayoutModule,
    MainModule,
    AccessControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
