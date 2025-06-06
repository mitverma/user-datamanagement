import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CommonService } from './services/common.service';


const firebaseConfig = {
  apiKey: "AIzaSyAdoQAurH1lK2IMOqVdBZvWNin0uRmSLsY",
  authDomain: "kent-3b295.firebaseapp.com",
  projectId: "kent-3b295",
  storageBucket: "kent-3b295.firebasestorage.app",
  messagingSenderId: "1053046070991",
  appId: "1:1053046070991:web:40ff295f28bd90072ce1ba",
  measurementId: "G-CZPZH8HW98"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [ 
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
