import Decimal from "decimal.js";
import { DomainError } from "@/domain/errors/domain-error";
import { Account } from "./account";

export class CheckingAccount extends Account {
	private readonly externalTransferFee = 0.005;

	async transfer(destinationAccount: Account, amount: number): Promise<void> {
		try {
			const amountDecimal = new Decimal(amount);

			const sameId = this.getId() === destinationAccount.getId();
			const sameNumber = this.getNumber() === destinationAccount.getNumber();
			const sameAgency = this.getAgency() === destinationAccount.getAgency();

			const isInternalTransfer = sameId || (sameNumber && sameAgency);
			if (isInternalTransfer) {
				const balance = await this.withdraw(amountDecimal.toNumber());
				await destinationAccount.deposit(balance);
				return;
			}

			const fee = amountDecimal.mul(this.externalTransferFee);
			const amountWithFee = amountDecimal.plus(fee);

			await this.withdraw(amountWithFee.toNumber());

			await destinationAccount.deposit(amountDecimal.toNumber());
		} catch {
			throw new DomainError("Invalid transfer amount");
		}
	}
}
