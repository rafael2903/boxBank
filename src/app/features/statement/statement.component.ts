import { Component } from '@angular/core';

interface StatementEntry {
  date: string;
  counterparty: string;
  amount: number;
  direction: 'incoming' | 'outgoing';
}

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  standalone: false,
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent {
  displayedColumns: string[] = ['date', 'description', 'amount'];
  dataSource: StatementEntry[] = [];
  private currentUserId = 1;
   private users = new Map<number, string>([
    [1, 'You'],
    [2, 'Jane Doe'],
    [3, 'Local Supermarket']
  ]);

  dataSource: StatementEntry[] = [
    { date: '2025-07-01', counterparty: 'Your Employer Inc.', amount: 3000, direction: 'incoming' },
    { date: '2025-07-03', counterparty: 'Local Supermarket', amount: 150, direction: 'outgoing' },
    { date: '2025-07-05', counterparty: 'City Power & Light', amount: 200, direction: 'outgoing' },
    { date: '2025-07-10', counterparty: 'Jane Doe', amount: 500, direction: 'incoming' },
    { date: '2025-07-12', counterparty: 'The Corner Bistro', amount: 80, direction: 'outgoing' }
  ];
}