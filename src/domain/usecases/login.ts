import type { User } from "../entities/user/user";

export interface Login {
	login(email: string, password: string, cpf: string): Promise<string>;
}
