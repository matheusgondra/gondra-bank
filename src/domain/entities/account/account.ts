import Decimal from "decimal.js";
import type { TransactionRegister } from "./transaction-register";

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

	getBalance(): Decimal {
		return this.balance;
	}
}
