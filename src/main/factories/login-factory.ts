import { LoginController } from "@/controllers/login-controller";
import { db } from "@/repository/db";
import { UserRepositoryPrisma } from "@/repository/user-repository-prisma";
import { LoginService } from "@/services/login-service";

export const makeLoginController = (): LoginController => {
	const userRepository = new UserRepositoryPrisma(db);
	const useCase = new LoginService(userRepository);
	return new LoginController(useCase);
};
