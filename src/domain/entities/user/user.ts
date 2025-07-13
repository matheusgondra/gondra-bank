import type { BirthDate } from "./birth-date";
import type { CPF } from "./cpf";
import type { Email } from "./email";
import type { Password } from "./password";

export class User {
	constructor(
		private readonly id: number,
		private readonly name: string,
		private readonly email: Email,
		private readonly password: Password,
		private readonly cpf: CPF,
		private readonly birthDate: BirthDate
	) {}

	getId(): number {
		return this.id;
	}

	getName(): string {
		return this.name;
	}

	getEmail(): Email {
		return this.email;
	}

	getPassword(): Password {
		return this.password;
	}

	getCPF(): CPF {
		return this.cpf;
	}

	getBirthDate(): BirthDate {
		return this.birthDate;
	}
}
