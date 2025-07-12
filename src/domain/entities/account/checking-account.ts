import { DomainError } from "@/domain/errors/domain-error";
import { Account } from "./account";

export class CheckingAccount extends Account {
	async transfer(destinationAccount: Account, amount: number): Promise<void> {
		try {
			const balance = await this.withdraw(amount);
			destinationAccount.deposit(balance);
		} catch {
			throw new DomainError("Invalid transfer amount");
		}
	}
}
