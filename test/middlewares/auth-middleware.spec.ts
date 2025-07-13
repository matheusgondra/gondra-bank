import { makeUserMock } from "@test/helpers/user-mock";
import type { User } from "@/domain/entities/user/user";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials";
import { unauthorized } from "@/helpers/http";
import type { UserRepository } from "@/interfaces/user-repository";
import { AuthMiddleware } from "@/middlewares/auth-middleware";

interface SutType {
	sut: AuthMiddleware;
	userRepositoryStub: UserRepository;
}

const makeUserRepositoryStub = (): UserRepository => {
	class UserRepositoryStub implements UserRepository {
		async loadByEmailOrCpf(email: string, cpf: string): Promise<User | null> {
			return null; // Stub implementation
		}

		async loadById(id: number): Promise<User | null> {
			return makeUserMock();
		}
	}

	return new UserRepositoryStub();
};

const makeSut = (): SutType => {
	const userRepositoryStub = makeUserRepositoryStub();
	const sut = new AuthMiddleware(userRepositoryStub);

	return {
		sut,
		userRepositoryStub
	};
};

describe("AuthMiddleware", () => {
	it("Should return 401 if no authorization header is provided", async () => {
		const { sut } = makeSut();

		const httpRequest = {};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse).toEqual(unauthorized(new InvalidCredentialsError()));
	});
});
