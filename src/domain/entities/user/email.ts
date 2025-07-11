import { DomainError } from "../../errors/domain-error";

export class Email {
	constructor(email: string) {
		this.validate(email);
	}

	private validate(email: string): void {
		const isBlank = email.trim() === "" || email === null || email === undefined;
		if (isBlank) {
			throw new DomainError("Invalid Email");
		}
	}
}
