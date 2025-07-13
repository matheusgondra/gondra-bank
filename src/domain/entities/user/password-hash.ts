import { compareSync, hashSync } from "bcryptjs";
import { Password } from "./password";

export class PasswordHash extends Password {
	constructor(password: string, skipHash: boolean = false) {
		super(password);
		if (!skipHash) {
			this.value = hashSync(password, Number(process.env.SALT));
		}
	}

	match(password: string): boolean {
		return compareSync(password, this.value);
	}
}
