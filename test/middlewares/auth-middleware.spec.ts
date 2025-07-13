import { makeUserMock } from "@test/helpers/user-mock";
import jwt from "jsonwebtoken";
import type { User } from "@/domain/entities/user/user";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials";
import { ok, unauthorized } from "@/helpers/http";
import type { UserRepository } from "@/interfaces/user-repository";
import { AuthMiddleware } from "@/middlewares/auth-middleware";

jest.mock("jsonwebtoken", () => ({
	verify: jest.fn().mockReturnValue({ sub: "1" })
}));

interface SutType {
	sut: AuthMiddleware;
	userRepositoryStub: UserRepository;
}

const makeUserRepositoryStub = (): UserRepository => {
	class UserRepositoryStub implements UserRepository {
		async loadByEmailOrCpf(_email: string, _cpf: string): Promise<User | null> {
			return null;
		}

		async loadById(_id: number): Promise<User | null> {
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

	it("Should return 401 if authorization header is not a Bearer token", async () => {
		const { sut } = makeSut();

		const httpRequest = {
			authorization: "InvalidToken"
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse).toEqual(unauthorized(new InvalidCredentialsError()));
	});

	it("Should return 401 if token is invalid", async () => {
		const { sut } = makeSut();
		jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
			throw new Error();
		});

		const httpRequest = {
			authorization: "Bearer invalid_token"
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse).toEqual(unauthorized(new InvalidCredentialsError()));
	});

	it("Should return 401 if user does not exist", async () => {
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "loadById").mockResolvedValueOnce(null);

		const httpRequest = {
			authorization: "Bearer valid_token"
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse).toEqual(unauthorized(new InvalidCredentialsError()));
	});

	it("Should return userId if token is valid and user exists", async () => {
		const { sut } = makeSut();

		const httpRequest = {
			authorization: "Bearer valid_token"
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse).toEqual(ok({ userId: 1 }));
	});
});
