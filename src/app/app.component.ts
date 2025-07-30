import { Component } from '@angular/core';
import { TransactionsService } from './shared/services/transactions.service';
import { UsersService } from './shared/services/users.service';
import { fader } from './route-animations';
import { ChildrenOutletContexts } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  animations: [
    fader // <-- Register the animation
  ]
})
export class AppComponent {
  constructor(
    private usersService: UsersService,
    private transactionsService: TransactionsService,
    private contexts: ChildrenOutletContexts
  ) {}
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  ngOnInit(): void {
    this.usersService.getAll().subscribe((users) => {
      console.log('Usuários:', users);
    });

    this.transactionsService.getAll().subscribe((transactions) => {
      console.log('Transações:', transactions);
    });
  }
}
