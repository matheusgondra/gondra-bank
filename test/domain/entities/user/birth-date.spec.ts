import { BirthDate } from "../../../../src/domain/entities/user/birth-date";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("BirthDate Entity", () => {
	it("Should throw a DomainError if the date is invalid", () => {
		expect(() => new BirthDate("invalid-date")).toThrow(new DomainError("Invalid birth date"));
	});
});
