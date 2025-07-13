import type { User as UserPrisma } from "generated/prisma";
import { BirthDate } from "@/domain/entities/user/birth-date";
import { CPF } from "@/domain/entities/user/cpf";
import { Email } from "@/domain/entities/user/email";
import { PasswordHash } from "@/domain/entities/user/password-hash";
import { User } from "@/domain/entities/user/user";

export class UserMapper {
	static toDomain(user: UserPrisma): User {
		return new User(
			user.id,
			user.name,
			new Email(user.email),
			new PasswordHash(user.password, true),
			new CPF(user.cpf),
			new BirthDate(user.birthDate)
		);
	}
}
