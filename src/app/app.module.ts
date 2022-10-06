import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule }    from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultsModule } from './results/results.module';
import { SharedModule } from './shared/shared.module';
import { PatientsModule } from './patients/patients.module';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { environment } from 'src/environments/environment';

registerLocaleData(localeEs, 'es-AR');
@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ResultsModule,
        PatientsModule,
        SharedModule,
        RouterModule.forRoot([]),
        RecaptchaV3Module
    ],
    exports: [RouterModule],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: LOCALE_ID, useValue: 'es-AR' },
        { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha.siteKey }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
