import { z } from "zod";
import type { Login } from "@/domain/usecases/login";
import { badRequest, ok, serverError } from "@/helpers/http";
import type { Controller } from "@/interfaces/controller";
import type { HttpRequest, HttpResponse } from "@/interfaces/http";

export class LoginController implements Controller {
	constructor(private readonly useCase: Login) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const body = this.validateBody(httpRequest.body);
			const { email, cpf, password } = body;
			let emailValue = email;
			let cpfValue = cpf;
			if (!emailValue) {
				emailValue = "invalid@invalid.com";
			}

			if (!cpfValue) {
				cpfValue = "12345678911";
			}

			const accessToken = await this.useCase.login(emailValue, password, cpfValue);
			return ok({ accessToken });
		} catch (error) {
			if (error instanceof z.ZodError) {
				return badRequest(new Error("invalid body"));
			}

			return serverError(error as Error);
		}
	}

	private validateBody(body: any) {
		const schema = z
			.object({
				email: z.email().optional(),
				cpf: z.string().optional(),
				password: z.string().min(8)
			})
			.refine((data) => data.email || data.cpf, {
				message: "Either email or cpf must be provided",
				path: ["email", "cpf"]
			});
		const result = schema.parse(body);
		return result;
	}
}
