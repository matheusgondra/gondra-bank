import { DomainError } from "@domain/errors/domain-error";

export class Password {
	protected value: string;

	constructor(password: string) {
		this.validate(password);

		this.value = password;
	}

	getValue(): string {
		return this.value;
	}

	private validate(password: string): void {
		const isBlank = !password || password.trim().length === 0;
		if (isBlank) {
			throw new DomainError("Invalid password");
		}

		const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
		if (!isStrongPassword) {
			throw new DomainError("Invalid password");
		}
	}
}
