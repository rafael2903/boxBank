import { Transaction } from "../models/transaction.model";

export interface CreateTransactionDto extends Omit<Transaction, 'id'> {}
