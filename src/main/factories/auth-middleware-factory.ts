import { AuthMiddleware } from "@/middlewares/auth-middleware";
import { db } from "@/repository/db";
import { UserRepositoryPrisma } from "@/repository/user-repository-prisma";

export const makeAuthMiddleware = (): AuthMiddleware => {
	const userRepository = new UserRepositoryPrisma(db);
	return new AuthMiddleware(userRepository);
};
