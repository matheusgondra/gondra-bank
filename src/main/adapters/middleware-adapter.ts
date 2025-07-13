import type { NextFunction, Request, Response } from "express";
import type { Controller } from "@/interfaces/controller";
import type { HttpRequest } from "@/interfaces/http";

export const middlewareAdapter = (controller: Controller) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const httpRequest: HttpRequest = {
			body: req.body,
			authorization: req.headers.authorization
		};

		const httpResponse = await controller.handle(httpRequest);
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
			req.userId = httpResponse.body.userId;
			next();
			return;
		}

		return res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
	};
};
