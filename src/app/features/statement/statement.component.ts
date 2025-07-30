import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';
import { TransactionsService } from '../../shared/services/transactions.service';
import { UsersService } from '../../shared/services/users.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface StatementEntry {
  date: Date;
  counterparty: string;
  amount: number;
  direction: 'incoming' | 'outgoing';
}

@Component({
  selector: 'app-statement',
  standalone: false,
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['date', 'description', 'amount'];
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<StatementEntry>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private authService: AuthService,
    private transactionsService: TransactionsService,
    private usersService: UsersService
  ) {}

   ngOnInit(): void {
    combineLatest([
      this.authService.currentUser$,
      this.transactionsService.getAll(),
      this.usersService.getAll(),
    ]).pipe(
      map(([currentUser, allTransactions, allUsers]) => {
        if (!currentUser) return [];

        const usersMap = new Map<string, string>(allUsers.map(u => [u.id, u.name]));

        return allTransactions
          .filter(tx => tx.senderId === currentUser.id || tx.receiverId === currentUser.id)
          .map((tx): StatementEntry => {
            const isIncoming = tx.receiverId === currentUser.id;
            const direction = isIncoming ? 'incoming' : 'outgoing';
            const counterpartyId = isIncoming ? tx.senderId : tx.receiverId;
            const counterpartyName = usersMap.get(counterpartyId) || 'Unknown User';

            return {
              date: tx.date,
              counterparty: counterpartyName,
              amount: tx.value,
              direction: direction,
            };
          })
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      })
    ).subscribe(processedEntries => {
      this.dataSource.data = processedEntries;
     
    });
  }
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}