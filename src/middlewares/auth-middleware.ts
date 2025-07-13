import { type JwtPayload, verify } from "jsonwebtoken";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials";
import { ok, unauthorized } from "@/helpers/http";
import type { HttpRequest, HttpResponse } from "@/interfaces/http";
import type { Middleware } from "@/interfaces/middleware";
import type { UserRepository } from "@/interfaces/user-repository";

export class AuthMiddleware implements Middleware {
	constructor(private readonly userRepository: UserRepository) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		if (!httpRequest.authorization) {
			return unauthorized(new InvalidCredentialsError());
		}

		const { authorization } = httpRequest;
		if (!authorization.startsWith("Bearer ")) {
			return unauthorized(new InvalidCredentialsError());
		}

		const [_bearer, token] = authorization.split(" ");
		const payload = this.verifyToken(token);
		if (!payload || !payload.sub) {
			return unauthorized(new InvalidCredentialsError());
		}

		const { sub: userId } = payload;
		const user = await this.userRepository.loadById(Number(userId));
		if (!user) {
			return unauthorized(new InvalidCredentialsError());
		}

		return ok({ userId: user.getId() });
	}

	private verifyToken(token: string): JwtPayload | null {
		try {
			return verify(token, process.env.JWT_SECRET as string) as JwtPayload;
		} catch {
			return null;
		}
	}
}
