import { LoadUserController } from "@/controllers/load-user-controller";
import { db } from "@/repository/db";
import { UserRepositoryPrisma } from "@/repository/user-repository-prisma";
import { LoadUserService } from "@/services/load-user-service";

export const makeLoadUserController = (): LoadUserController => {
	const userRepository = new UserRepositoryPrisma(db);
	const loadUser = new LoadUserService(userRepository);
	return new LoadUserController(loadUser);
};
