import { CheckingAccount } from "@/domain/entities/account/checking-account";
import type { TransactionRegister } from "@/domain/entities/account/transaction-register";
import { DomainError } from "@/domain/errors/domain-error";

const makeTransactionRegister = (): TransactionRegister => {
	class TransactionRegisterStub implements TransactionRegister {
		async register() {
			return true;
		}
	}
	return new TransactionRegisterStub();
};

interface SutTypes {
	sut: CheckingAccount;
	transactionRegisterStub: TransactionRegister;
	accountStub: CheckingAccount;
}

const makeSut = (): SutTypes => {
	const transactionRegisterStub = makeTransactionRegister();
	const sut = new CheckingAccount("anyId", 1, 1, 1000, transactionRegisterStub);
	const accountStub = new CheckingAccount("anyId2", 2, 1, 1000, transactionRegisterStub);

	return {
		sut,
		transactionRegisterStub,
		accountStub
	};
};

describe("CheckingAccount", () => {
	const amount = 100;
	const zeroAmount = 0;

	describe("deposit", () => {
		it("Should throw a DomainError if deposit amount is less than or equal to zero", async () => {
			const { sut } = makeSut();

			const promise = sut.deposit(zeroAmount);

			await expect(promise).rejects.toThrow(new DomainError("Invalid deposit amount"));
		});

		it("Should deposit an amount on the account", async () => {
			const { sut } = makeSut();

			await sut.deposit(amount);

			expect(sut.getBalance().toNumber()).toBe(1100);
		});
	});

	describe("withdraw", () => {
		it("Should throw a DomainError if amount is less than or equal to zero", async () => {
			const { sut } = makeSut();

			const promise = sut.withdraw(zeroAmount);

			await expect(promise).rejects.toThrow(new DomainError("Invalid withdraw amount"));
		});

		it("Should throw a DomainError if balance is insufficient", async () => {
			const { sut } = makeSut();

			const promise = sut.withdraw(2000);

			await expect(promise).rejects.toThrow(new DomainError("Insufficient balance"));
		});

		it("Should withdraw an amount from the account", async () => {
			const { sut } = makeSut();

			await sut.withdraw(amount);

			expect(sut.getBalance().toNumber()).toBe(900);
		});
	});

	describe("transfer", () => {
		it("Should throw a DomainError if amount is less than or equal to zero", async () => {
			const { sut, accountStub } = makeSut();

			const promise = sut.transfer(accountStub, zeroAmount);

			await expect(promise).rejects.toThrow(new DomainError("Invalid transfer amount"));
		});

		it("Should transfer an amount to another account", async () => {
			const { sut } = makeSut();

			await sut.transfer(sut, amount);

			expect(sut.getBalance().toNumber()).toBe(1000);
		});

		it("Should charge a 0.5% fee for external transfers", async () => {
			const { sut, accountStub } = makeSut();
			const externalTransferAmount = 500;

			const sutBalanceBeforeTransfer = sut.getBalance().toNumber();

			await sut.transfer(accountStub, externalTransferAmount);

			const fee = externalTransferAmount * 0.005;
			const expectedBalance = sutBalanceBeforeTransfer - (externalTransferAmount + fee);

			expect(sut.getBalance().toNumber()).toBe(expectedBalance);
			expect(accountStub.getBalance().toNumber()).toBe(1500);
		});
	});
});
