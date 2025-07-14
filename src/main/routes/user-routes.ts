import type { Router } from "express";
import { auth } from "@/middlewares/auth";
import { routeAdapter } from "../adapters/route-adapter";
import { makeLoadUserController } from "../factories/load-user-factory";

export const userRoutes = (router: Router) => {
	router.get("/me", auth, routeAdapter(makeLoadUserController()));
};
