import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserModule } from './features/create-user/create-user.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { LoginModule } from './features/login/login.module';
import { StatementModule } from './features/statement/statement.module';
import { TransferModule } from './features/transfer/transfer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TransferModule,
    DashboardModule,
    CreateUserModule,
    StatementModule,
    LoginModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(),
    provideEnvironmentNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
