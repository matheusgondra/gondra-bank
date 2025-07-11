import { DomainError } from "../../errors/domain-error";

export class BirthDate {
	constructor(date: string | Date) {
		const dateObject = new Date(date);
		this.validate(dateObject);
	}

	private validate(date: Date): void {
		const isInvalidDate = Number.isNaN(date.getTime());
		if (isInvalidDate) {
			throw new DomainError("Invalid birth date");
		}

		const today = new Date();
		if (date > today) {
			throw new DomainError("Invalid birth date");
		}

		const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
		if (date > eighteenYearsAgo) {
			throw new DomainError("Invalid birth date");
		}
	}
}
