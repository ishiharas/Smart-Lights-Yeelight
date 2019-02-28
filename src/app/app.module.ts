import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatSliderModule,
  MatDividerModule,
  MatListModule,
  MatDialogModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorHueModule } from 'ngx-color/hue';
import { ColorCircleModule } from 'ngx-color/circle';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsDialogComponent } from './components/settings/settings-dialog.component';

import 'hammerjs';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsDialogComponent,
    WebviewDirective
  ],
  entryComponents: [ SettingsDialogComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    MatButtonModule,
    MatSliderModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    ColorHueModule,
    ColorCircleModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
