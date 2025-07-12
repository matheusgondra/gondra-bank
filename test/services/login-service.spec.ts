import { makeUserMock } from "@test/helpers/user-mock";
import type { User } from "@/domain/entities/user/user";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials";
import type { UserRepository } from "@/interfaces/user-repository";
import { LoginService } from "@/services/login-service";

jest.mock("jsonwebtoken", () => ({
	sign: () => "any_token"
}));

const userMock = makeUserMock();

interface SutType {
	sut: LoginService;
	userRepositoryStub: UserRepository;
	userMock: User;
}

const makeUserRepositoryStub = (): UserRepository => {
	class UserRepositoryStub implements UserRepository {
		async loadByEmailOrCpf(email: string, cpf: string): Promise<User | null> {
			return userMock;
		}
	}

	return new UserRepositoryStub();
};

const makeSut = (): SutType => {
	const userRepositoryStub = makeUserRepositoryStub();
	const sut = new LoginService(userRepositoryStub);

	return {
		sut,
		userRepositoryStub,
		userMock
	};
};

describe("LoginService", () => {
	const email = "any@mail.com";
	const password = "StrongPassword@123";
	const cpf = "12345678901";

	it("Should call UserRepository with correct values", async () => {
		const { sut, userRepositoryStub } = makeSut();
		const loadByEmailOrCpfSpy = jest.spyOn(userRepositoryStub, "loadByEmailOrCpf");

		await sut.login(email, password, cpf);

		expect(loadByEmailOrCpfSpy).toHaveBeenCalledWith(email, cpf);
	});

	it("Should throw InvalidCredentialsError if user is not found", async () => {
		const { sut, userRepositoryStub } = makeSut();
		jest.spyOn(userRepositoryStub, "loadByEmailOrCpf").mockResolvedValueOnce(null);

		const promise = sut.login(email, password, cpf);

		await expect(promise).rejects.toThrow(new InvalidCredentialsError());
	});

	it("Should call User's match method with correct password", async () => {
		const { sut, userMock } = makeSut();

		const matchSpy = jest.spyOn(userMock.getPassword(), "match");

		await sut.login(email, password, cpf);

		expect(matchSpy).toHaveBeenCalledWith(password);
	});

	it("Should throw InvalidCredentialsError if password is invalid", async () => {
		const { sut, userMock } = makeSut();
		jest.spyOn(userMock.getPassword(), "match").mockReturnValueOnce(false);

		const promise = sut.login(email, password, cpf);

		await expect(promise).rejects.toThrow(new InvalidCredentialsError());
	});
});
