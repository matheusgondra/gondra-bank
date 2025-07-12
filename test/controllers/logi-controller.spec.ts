import { LoginController } from "@/controllers/login-controller";
import type { Login } from "@/domain/usecases/login";
import { badRequest } from "@/helpers/http";
import type { HttpRequest } from "@/interfaces/http";

interface SutType {
	sut: LoginController;
	loginStub: Login;
}

const makeLoginStub = (): Login => {
	class LoginStub implements Login {
		async login(email: string, cpf: string, password: string): Promise<string> {
			return "valid_token";
		}
	}
	return new LoginStub();
};

const makeSut = (): SutType => {
	const loginStub = makeLoginStub();
	const sut = new LoginController(loginStub);

	return {
		sut,
		loginStub
	};
};

describe("LoginController", () => {
	it("Should return 400 if body is invalid", async () => {
		const httpRequest: HttpRequest = {
			body: {
				email: "invalid-email",
				password: "short"
			}
		};

		const { sut } = makeSut();

		const response = await sut.handle(httpRequest);
		expect(response).toEqual(badRequest(new Error("invalid body")));
	});
});
