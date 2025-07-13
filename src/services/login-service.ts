import { sign } from "jsonwebtoken";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials";
import type { Login } from "@/domain/usecases/login";
import type { UserRepository } from "@/interfaces/user-repository";

export class LoginService implements Login {
	constructor(private readonly userRepository: UserRepository) {}

	async login(email: string, password: string, cpf: string): Promise<string> {
		const user = await this.userRepository.loadByEmailOrCpf(email, cpf);
		if (!user) {
			throw new InvalidCredentialsError();
		}

		const isPasswordValid = user.getPassword().match(password);
		if (!isPasswordValid) {
			throw new InvalidCredentialsError();
		}

		return sign({ sub: user.getId() }, process.env.JWT_SECRET as string, {
			expiresIn: "1d"
		});
	}
}
