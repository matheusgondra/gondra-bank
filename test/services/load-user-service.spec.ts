import { makeUserMock } from "@test/helpers/user-mock";
import type { User } from "@/domain/entities/user/user";
import type { UserRepository } from "@/interfaces/user-repository";
import { LoadUserService } from "@/services/load-user-service";

interface SutType {
	sut: LoadUserService;
	userRepositoryStub: UserRepository;
}

const userMock = makeUserMock();

const makeUserRepositoryStub = (): UserRepository => {
	class UserRepositoryStub implements UserRepository {
		async loadById(id: number): Promise<User | null> {
			return userMock;
		}

		loadByEmailOrCpf(email: string, cpf: string): Promise<User | null> {
			throw new Error("Method not implemented.");
		}
	}
	return new UserRepositoryStub();
};

const makeSut = (): SutType => {
	const userRepositoryStub = makeUserRepositoryStub();
	const sut = new LoadUserService(userRepositoryStub);

	return {
		sut,
		userRepositoryStub
	};
};

describe("LoadUserService", () => {
	const userId = 1;

	it("Should call UserRepository with correct value", async () => {
		const { sut, userRepositoryStub } = makeSut();
		const loadByIdSpy = jest.spyOn(userRepositoryStub, "loadById");

		await sut.load(userId);

		expect(loadByIdSpy).toHaveBeenCalledWith(1);
	});
});
