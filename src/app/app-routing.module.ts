import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferComponent } from './features/transfer/transfer.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CreateUserComponent } from './features/create-user/create-user.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [AuthGuard],
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
