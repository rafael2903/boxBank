export interface Transaction {
  id: string;
  receiverId: string;
  senderId: string;
  value: number;
  date: Date;
}
