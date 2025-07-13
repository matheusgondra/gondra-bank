import { makeUserMock } from "@test/helpers/user-mock";
import { LaodUserController } from "@/controllers/load-user-controller";
import type { User } from "@/domain/entities/user/user";
import { UserNotFoundError } from "@/domain/errors/user-not-found-error";
import type { LoadUser } from "@/domain/usecases/load-user";
import { badRequest } from "@/helpers/http";
import type { HttpRequest } from "@/interfaces/http";

interface SutType {
	sut: LaodUserController;
	loadUserStub: LoadUser;
}

const makeLoadUserStub = (): LoadUser => {
	class LoadUserStub implements LoadUser {
		async load(_id: number): Promise<User | null> {
			return makeUserMock();
		}
	}

	return new LoadUserStub();
};

const makeSut = (): SutType => {
	const loadUserStub = makeLoadUserStub();
	const sut = new LaodUserController(loadUserStub);

	return {
		sut,
		loadUserStub
	};
};

describe("LoadUserController", () => {
	const httpRequest: HttpRequest = {
		userId: 1
	};

	it("Should return 400 if no user is found", async () => {
		const { sut, loadUserStub } = makeSut();
		jest.spyOn(loadUserStub, "load").mockResolvedValueOnce(null);

		const response = await sut.handle(httpRequest);

		expect(response).toEqual(badRequest(new UserNotFoundError()));
	});
});
