import { type Express, Router } from "express";
import { authRoutes } from "./auth-routes";
import { userRoutes } from "./user-routes";

export const routes = (app: Express): void => {
	const router = Router();

	app.use("/api", router);

	authRoutes(router);
	userRoutes(router);
};
