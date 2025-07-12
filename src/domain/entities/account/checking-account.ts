import { Decimal } from "decimal.js";
import { DomainError } from "@/domain/errors/domain-error";
import { Account } from "./account";
import { TransactionType } from "./transaction-type";

export class CheckingAccount extends Account {
	deposit(amount: number) {
		const decimalAmount = new Decimal(amount);
		if (decimalAmount.lessThanOrEqualTo(0)) {
			throw new DomainError("Invalid deposit amount");
		}

		this.balance = this.balance.plus(decimalAmount);
		this.register.register({
			date: new Date(),
			amount,
			type: TransactionType.DEPOSIT,
			from: this,
			to: this
		});
	}
}
