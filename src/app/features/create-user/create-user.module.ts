import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CreateUserComponent } from './create-user.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [CommonModule, SharedModule, FormsModule, RouterLink],
  providers: [provideHttpClient()],

})
export class CreateUserModule {}
