import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [CommonModule, SharedModule, FormsModule, RouterLink],
})
export class CreateUserModule {}
