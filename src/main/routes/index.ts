import { type Express, Router } from "express";
import { authRoutes } from "./auth-routes";

export const routes = (app: Express): void => {
	const router = Router();

	app.use("/api", router);

	authRoutes(router);
};
