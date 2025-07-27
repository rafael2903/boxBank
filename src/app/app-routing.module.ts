import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './features/example/example.component';
import { TransferComponent } from './features/transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleComponent,
  },
  {
    path: 'transfer',
    component: TransferComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
