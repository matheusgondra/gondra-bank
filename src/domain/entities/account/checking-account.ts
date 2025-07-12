import { Decimal } from "decimal.js";
import { DomainError } from "@/domain/errors/domain-error";

export class CheckingAccount {
	private readonly id: string;
	private readonly number: number;
	private readonly agency: number;
	private balance: Decimal;

	constructor(id: string, number: number, agency: number, balance: number) {
		this.id = id;
		this.number = number;
		this.agency = agency;
		this.balance = new Decimal(balance);
	}

	deposit(amount: number) {
		const decimalAmount = new Decimal(amount);
		if (decimalAmount.lessThanOrEqualTo(0)) {
			throw new DomainError("Invalid deposit amount");
		}

		this.balance = this.balance.plus(decimalAmount);
	}

	getBalance(): Decimal {
		return this.balance;
	}
}
