import { Email } from "@domain/entities/user/email";
import { DomainError } from "@domain/errors/domain-error";

describe("Email Entity", () => {
	const validValue = "test@example.com";

	describe("Constructor", () => {
		const domainError = new DomainError("Invalid Email");

		it("Should throw a DomainError if email value is blank", () => {
			const invalidValue = "";
			expect(() => new Email(invalidValue)).toThrow(domainError);
		});

		it("Should throw a DomainError if email value is not a valid email format", () => {
			const invalidValue = "invalid-email";
			expect(() => new Email(invalidValue)).toThrow(domainError);
		});

		it("Should return a valid Email instance if email value is valid", () => {
			const email = new Email(validValue);

			expect(email).toBeInstanceOf(Email);
		});
	});

	describe("getValue", () => {
		it("Should return the email value", () => {
			const email = new Email(validValue);
			expect(email.getValue()).toBe(validValue);
		});
	});
});
