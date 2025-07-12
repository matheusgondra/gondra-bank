import { CheckingAccount } from "@/domain/entities/account/checking-account";
import type { TransactionRegister } from "@/domain/entities/account/transaction-register";
import { TransactionType } from "@/domain/entities/account/transaction-type";
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
}

const makeSut = (): SutTypes => {
	const transactionRegisterStub = makeTransactionRegister();
	const sut = new CheckingAccount("anyId", 1, 1, 1000, transactionRegisterStub);

	return {
		sut,
		transactionRegisterStub
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

		it("Should call TransactionRegister with correct value", async () => {
			const { sut, transactionRegisterStub } = makeSut();
			const registerSpy = jest.spyOn(transactionRegisterStub, "register");

			await sut.deposit(amount);

			expect(registerSpy).toHaveBeenCalledWith({
				date: expect.any(Date),
				amount,
				type: TransactionType.DEPOSIT,
				from: sut,
				to: sut
			});
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
});
