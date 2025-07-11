import type { User } from "../entities/user/user";

export interface Login {
	login(user: User): Promise<string>;
}
