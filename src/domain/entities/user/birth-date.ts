import { DomainError } from "@domain/errors/domain-error";
import moment from "moment";

export class BirthDate {
	private readonly date: Date;

	constructor(date: string | Date) {
		const dateObject = new Date(date);
		this.validate(dateObject);
		this.date = dateObject;
	}

	getValue(): Date {
		return this.date;
	}

	private validate(date: Date): void {
		const isValidDate = moment(date).isValid();
		if (!isValidDate) {
			throw new DomainError("Invalid birth date");
		}

		const today = moment();
		const isFutureDate = moment(date).isAfter(today);
		if (isFutureDate) {
			throw new DomainError("Invalid birth date");
		}

		const eighteenYearsAgo = moment().subtract(18, "years");
		const birthDate = moment(date);
		const isUnderEighteen = birthDate.isAfter(eighteenYearsAgo);
		if (isUnderEighteen) {
			throw new DomainError("Invalid birth date");
		}
	}
}
