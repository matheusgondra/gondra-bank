import { UserNotFoundError } from "@/domain/errors/user-not-found-error";
import type { LoadUser } from "@/domain/usecases/load-user";
import { badRequest, ok, serverError } from "@/helpers/http";
import type { Controller } from "@/interfaces/controller";
import type { HttpRequest, HttpResponse } from "@/interfaces/http";

export class LaodUserController implements Controller {
	constructor(private readonly loadUser: LoadUser) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { userId } = httpRequest;

			const user = await this.loadUser.load(userId as number);
			if (!user) {
				return badRequest(new UserNotFoundError());
			}

			return ok(user);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
