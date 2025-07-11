import { Email } from "../../../../src/domain/entities/user/email";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("Email Entity", () => {
	it("Should throw a DomainError if email value is blank", () => {
		const invalidValue = "";
		expect(() => new Email(invalidValue)).toThrow(new DomainError("Invalid Email"));
	});
});
