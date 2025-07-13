import { CPF } from "@domain/entities/user/cpf";
import { DomainError } from "@domain/errors/domain-error";

describe("CPF Entity", () => {
	const validValue = "123.456.789-00";

	describe("Constructor", () => {
		it("Should throw a DomainError if cpf value length is less than 11", () => {
			const invalidValue = "123";
			expect(() => new CPF(invalidValue)).toThrow(new DomainError("Invalid CPF"));
		});

		it("Should throw a DomainError if cpf value is invalid sequence", () => {
			const invalidValue = "00000000000";
			expect(() => new CPF(invalidValue)).toThrow(new DomainError("Invalid CPF"));
		});

		it("Should create a valid instance", () => {
			const cpf = new CPF(validValue);

			expect(cpf).toBeInstanceOf(CPF);
		});
	});

	describe("getValue", () => {
		it("Should return the value of the CPF", () => {
			const cpf = new CPF(validValue);

			expect(cpf.getValue()).toBe(validValue);
		});
	});
});
