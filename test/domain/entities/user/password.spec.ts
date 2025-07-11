import { Password } from "../../../../src/domain/entities/user/password";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("Password Entity", () => {
	describe("Constructor", () => {
		it("Should throw a DomainError if the password is blank", () => {
			const blankPassword = "";
			expect(() => new Password(blankPassword)).toThrow(new DomainError("Invalid password"));
		});
	});
});
