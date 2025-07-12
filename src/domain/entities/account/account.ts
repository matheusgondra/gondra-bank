import Decimal from "decimal.js";
import { DomainError } from "@/domain/errors/domain-error";
import type { TransactionRegister } from "./transaction-register";
import { TransactionType } from "./transaction-type";

export abstract class Account {
	private readonly id: string;
	private readonly number: number;
	private readonly agency: number;
	protected balance: Decimal;
	protected register: TransactionRegister;

	constructor(id: string, number: number, agency: number, balance: number, register: TransactionRegister) {
		this.id = id;
		this.number = number;
		this.agency = agency;
		this.balance = new Decimal(balance);
		this.register = register;
	}

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

	withdraw(amount: number) {
		const decimalAmount = new Decimal(amount);
		if (decimalAmount.lessThanOrEqualTo(0)) {
			throw new DomainError("Invalid withdraw amount");
		}

		if (this.balance.lessThan(decimalAmount)) {
			throw new DomainError("Insufficient balance");
		}
	}

	getBalance(): Decimal {
		return this.balance;
	}
}
