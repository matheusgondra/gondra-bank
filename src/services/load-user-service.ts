import type { User } from "@/domain/entities/user/user";
import type { LoadUser } from "@/domain/usecases/load-user";
import type { UserRepository } from "@/interfaces/user-repository";

export class LoadUserService implements LoadUser {
	constructor(private readonly userRepository: UserRepository) {}

	async load(id: number): Promise<User | null> {
		const user = await this.userRepository.loadById(id);
		if (!user) {
			return null;
		}

		return user;
	}
}
