import Decimal from "decimal.js";
import { DomainError } from "@/domain/errors/domain-error";
import { Account } from "./account";

export class InvestmentAccount extends Account {
	async transfer(destinationAccount: Account, amount: number): Promise<void> {
		const amountDecimal = new Decimal(amount);

		const isLessThanOrEqualToZero = amountDecimal.lessThanOrEqualTo(0);
		if (isLessThanOrEqualToZero) {
			throw new DomainError("Invalid transfer");
		}

		const isExternalTransfer = this.getHolder().getId() !== destinationAccount.getHolder().getId();
		if (isExternalTransfer) {
			throw new DomainError("Invalid transfer");
		}
	}
}
