import type { BirthDate } from "./birth-date";
import type { Email } from "./email";
import type { Password } from "./password";

export class User {
	constructor(
		private readonly id: string,
		private readonly name: string,
		private readonly email: Email,
		private readonly password: Password,
		private readonly birthDate: BirthDate
	) {}
}
