import { Password } from "../../../../src/domain/entities/user/password";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("Password Entity", () => {
	describe("Constructor", () => {
		it("Should throw a DomainError if the password is blank", () => {
			const blankPassword = "";
			expect(() => new Password(blankPassword)).toThrow(new DomainError("Invalid password"));
		});

		it("Should throw a DomainError if the password is not strong", () => {
			const weakPassword = "12345";
			expect(() => new Password(weakPassword)).toThrow(new DomainError("Invalid password"));
		});

		it("Should return an instance of Password for a valid password", () => {
			const validPassword = "StrongPass1!";
			const passwordInstance = new Password(validPassword);
			expect(passwordInstance).toBeInstanceOf(Password);
		});
	});
});
