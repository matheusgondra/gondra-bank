import { InvestmentAccount } from "@/domain/entities/account/investment-account";
import type { TransactionRegister } from "@/domain/entities/account/transaction-register";
import { BirthDate } from "@/domain/entities/user/birth-date";
import { Email } from "@/domain/entities/user/email";
import { Password } from "@/domain/entities/user/password";
import { User } from "@/domain/entities/user/user";
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
	sut: InvestmentAccount;
	transactionRegisterStub: TransactionRegister;
	accountStub: InvestmentAccount;
}

const makeSut = (): SutTypes => {
	const transactionRegisterStub = makeTransactionRegister();
	const userSutStub = new User(
		"anyUserSutId",
		"anyName",
		new Email("any@mail.com"),
		new Password("StrongPassword@123"),
		new BirthDate("2000-01-01")
	);
	const userStub = new User(
		"anyUserId",
		"anyName",
		new Email("other@mail.com"),
		new Password("StrongPassword@123"),
		new BirthDate("2000-01-01")
	);
	const sut = new InvestmentAccount("anyId", 1, 1, 1000, transactionRegisterStub, userSutStub);
	const accountStub = new InvestmentAccount("anyId2", 2, 1, 1000, transactionRegisterStub, userStub);

	return {
		sut,
		transactionRegisterStub,
		accountStub
	};
};

describe("InvestmentAccount", () => {
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
			const { sut } = makeSut();

			const promise = sut.transfer(sut, zeroAmount);

			await expect(promise).rejects.toThrow(new DomainError("Invalid transfer"));
		});
	});
});
