import type { Router } from "express";
import { routeAdapter } from "../adapters/route-adapter";
import { makeLoginController } from "../factories/login-factory";

export const authRoutes = (router: Router) => {
	router.post("/login", routeAdapter(makeLoginController()));
};
