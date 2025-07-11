import { Email } from "../../../../src/domain/entities/user/email";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("Email Entity", () => {
	const domainError = new DomainError("Invalid Email");

	it("Should throw a DomainError if email value is blank", () => {
		const invalidValue = "";
		expect(() => new Email(invalidValue)).toThrow(domainError);
	});

	it("Should throw a DomainError if email value is not a valid email format", () => {
		const invalidValue = "invalid-email";
		expect(() => new Email(invalidValue)).toThrow(domainError);
	});
});
