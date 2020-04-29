import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import 'firebase/firestore'

import { MaterialModule } from './shared/material/material.module';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { LoggedGuard } from './core/auth/logged.guard';
import { NotLoggedGuard } from './core/auth/not-logged.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';

import { BackArrowComponent } from './shared/components/back-arrow/back-arrow.component';
import { DotsMenuComponent } from './shared/components/dots-menu/dots-menu.component';
import { BottomMenuComponent } from './shared/components/bottom-menu/bottom-menu.component';

import { registerLocaleData } from '@angular/common';
import locale_ES from '@angular/common/locales/es';
import { ListCardComponent } from './shared/components/list-card/list-card.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { ListComponent } from './pages/list/list.component';
registerLocaleData(locale_ES, 'es');

@NgModule({
  entryComponents: [
    BottomMenuComponent,
    DialogComponent
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BackArrowComponent,
    DotsMenuComponent,
    BottomMenuComponent,
    ListCardComponent,
    DialogComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule
  ],
  providers: [
    LoggedGuard,
    NotLoggedGuard,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher} ,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
