import { CPF } from "../../../../src/domain/entities/user/cpf";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("CPF Entity", () => {
	const invalidValue = "123";

	it("Should throw a DomainError if cpf value length is less than 11", () => {
		expect(() => new CPF(invalidValue)).toThrow(new DomainError("Invalid CPF length"));
	});
});
