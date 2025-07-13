import type { User } from "@/domain/entities/user/user";

export interface UserRepository {
	loadByEmailOrCpf(email: string, cpf: string): Promise<User | null>;
	loadById(id: number): Promise<User | null>;
}
