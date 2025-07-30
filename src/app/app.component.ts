import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fader } from './route-animations';
import { TransactionsService } from './shared/services/transactions.service';
import { UsersService } from './shared/services/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  animations: [
    fader
  ]
})
export class AppComponent {
  constructor(
    private usersService: UsersService,
    private transactionsService: TransactionsService,
    private contexts: ChildrenOutletContexts
  ) {}
  
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
