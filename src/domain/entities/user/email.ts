import { DomainError } from "../../errors/domain-error";

export class Email {
	private readonly value: string;

	constructor(email: string) {
		this.validate(email);
		this.value = email;
	}

	getValue(): string {
		return this.value;
	}

	private validate(email: string): void {
		const isBlank = email.trim() === "" || email === null || email === undefined;
		if (isBlank) {
			throw new DomainError("Invalid Email");
		}

		const isValidEmail = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
		if (!isValidEmail) {
			throw new DomainError("Invalid Email");
		}
	}
}
