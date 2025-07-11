import { BirthDate } from "../../../../src/domain/entities/user/birth-date";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("BirthDate Entity", () => {
	const domainError = new DomainError("Invalid birth date");

	it("Should throw a DomainError if the date is invalid", () => {
		const invalidDate = "invalid-date";
		expect(() => new BirthDate(invalidDate)).toThrow(domainError);
	});

	it("Should throw a DomainError if the date is in the future", () => {
		const SECOND = 1000;
		const MINUTE = SECOND * 60;
		const HOUR = MINUTE * 60;
		const DAY = HOUR * 24;

		const futureDate = new Date(Date.now() + DAY);

		expect(() => new BirthDate(futureDate)).toThrow(domainError);
	});

	it("Should throw a DomainError if the date is under 18 years old", () => {
		const today = new Date();
		const underEighteenYearsAgo = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());

		expect(() => new BirthDate(underEighteenYearsAgo)).toThrow(domainError);
	});
});
