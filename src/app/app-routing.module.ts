import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './features/example/example.component';
import { TransferComponent } from './features/transfer/transfer.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CreateUserComponent } from './features/create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleComponent,
  },
  {
    path: 'transfer',
    component: TransferComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'criar-conta',
    component: CreateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
