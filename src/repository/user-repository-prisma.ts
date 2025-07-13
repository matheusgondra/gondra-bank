import type { PrismaClient } from "@/../generated/prisma";
import type { User } from "@/domain/entities/user/user";
import type { UserRepository } from "@/interfaces/user-repository";
import { UserMapper } from "@/mappers/user-mapper";

export class UserRepositoryPrisma implements UserRepository {
	constructor(private readonly db: PrismaClient) {}

	async loadByEmailOrCpf(email: string, cpf: string): Promise<User | null> {
		const user = await this.db.user.findFirst({
			where: {
				OR: [{ email }, { cpf }]
			}
		});

		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}
}
