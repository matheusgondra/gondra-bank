import type { User } from "../entities/user/user";

export interface LoadUser {
	load(id: number): Promise<User | null>;
}
