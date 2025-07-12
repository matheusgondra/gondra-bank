import type { Account } from "./account";
import type { TransactionType } from "./transaction-type";

export interface Transaction {
	date: Date;
	amount: number;
	type: TransactionType;
	from: Account;
	to: Account;
}

export interface TransactionRegister {
	register(transaction: Transaction): Promise<boolean>;
}
