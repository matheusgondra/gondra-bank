import { DomainError } from "../../errors/domain-error";

export class Password {
	constructor(password: string) {
		this.validate(password);
	}

	private validate(password: string): void {
		const isBlank = !password || password.trim().length === 0;
		if (isBlank) {
			throw new DomainError("Invalid password");
		}
	}
}
