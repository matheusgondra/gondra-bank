import { compareSync, hashSync } from "bcryptjs";
import { Password } from "./password";

export class PasswordHash extends Password {
	constructor(password: string) {
		super(password);
		this.value = hashSync(password, process.env.SALT);
	}

	match(password: string): boolean {
		return compareSync(password, this.value);
	}
}
