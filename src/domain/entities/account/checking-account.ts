import { DomainError } from "@/domain/errors/domain-error";
import { Account } from "./account";

export class CheckingAccount extends Account {
	async transfer(destinationAccount: Account, amount: number): Promise<void> {
		try {
			await this.withdraw(amount);
		} catch {
			throw new DomainError("Invalid transfer amount");
		}
	}
}
