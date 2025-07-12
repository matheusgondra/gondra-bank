import { CheckingAccount } from "../../../../src/domain/entities/account/checking-account";
import { DomainError } from "../../../../src/domain/errors/domain-error";

const makeSut = (): CheckingAccount => {
	return new CheckingAccount("anyId", 1, 1, 1000);
};

describe("CheckingAccount", () => {
	describe("deposit", () => {
		it("Should throw a DomainError if deposit amount is less than or equal to zero", () => {
			const sut = makeSut();
			const amount = 0;

			expect(() => sut.deposit(amount)).toThrow(new DomainError("Invalid deposit amount"));
		});
	});
});
