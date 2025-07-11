import { BirthDate } from "../../../../src/domain/entities/user/birth-date";
import { DomainError } from "../../../../src/domain/errors/domain-error";

describe("BirthDate Entity", () => {
	const validDate = "2000-11-23T00:00:00Z";

	describe("Constructor", () => {
		const domainError = new DomainError("Invalid birth date");
		const SECOND = 1000;
		const MINUTE = SECOND * 60;
		const HOUR = MINUTE * 60;
		const DAY = HOUR * 24;

		it("Should throw a DomainError if the date is invalid", () => {
			const invalidDate = "invalid-date";
			expect(() => new BirthDate(invalidDate)).toThrow(domainError);
		});

		it("Should throw a DomainError if the date is in the future", () => {
			const futureDate = new Date(Date.now() + DAY);

			expect(() => new BirthDate(futureDate)).toThrow(domainError);
		});

		it("Should throw a DomainError if the date is under 18 years old", () => {
			const today = new Date();
			const underEighteenYearsAgo = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());

			expect(() => new BirthDate(underEighteenYearsAgo)).toThrow(domainError);
		});

		it("Should return a instance of BirthDate for a valid date", () => {
			const instance = new BirthDate(validDate);

			expect(instance).toBeInstanceOf(BirthDate);
		});
	});

	describe("getValue", () => {
		it("Should return the date value", () => {
			const birthDate = new BirthDate(validDate);
			const dateValue = new Date(validDate);

			expect(birthDate.getValue()).toEqual(dateValue);
		});
	});
});
