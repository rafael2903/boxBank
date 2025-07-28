import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleModule } from './features/example/example.module';
import { provideHttpClient } from '@angular/common/http';
import { TransferModule } from './features/transfer/transfer.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { CreateUserComponent } from './features/create-user/create-user.component';
import { CreateUserModule } from './features/create-user/create-user.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExampleModule,
    TransferModule,
    DashboardModule,
    CreateUserModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
