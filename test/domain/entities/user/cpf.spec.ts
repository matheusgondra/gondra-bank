import { CPF } from "../../../../src/domain/entities/user/cpf";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("CPF Entity", () => {
	it("Should throw a DomainError if cpf value length is less than 11", () => {
		const invalidValue = "123";
		expect(() => new CPF(invalidValue)).toThrow(new DomainError("Invalid CPF"));
	});

	it("Should throw a DomainError if cpf value is invalid sequence", () => {
		const invalidValue = "00000000000";
		expect(() => new CPF(invalidValue)).toThrow(new DomainError("Invalid CPF"));
	});
});
