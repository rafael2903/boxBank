import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { CreateUserComponent } from './features/create-user/create-user.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { StatementComponent } from './features/statement/statement.component';
import { TransferComponent } from './features/transfer/transfer.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'criar-conta',
    component: CreateUserComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { animation: 'DashboardPage' },
  },
  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [AuthGuard],
    data: { animation: 'TransferPage' },
  },
  {
    path: 'extrato',
    component: StatementComponent,
    canActivate: [AuthGuard],
    data: { animation: 'StatementPage' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
