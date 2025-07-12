import { type Express, Router } from "express";

export const routes = (app: Express): void => {
	const router = Router();

	app.use("/api", router);
};
