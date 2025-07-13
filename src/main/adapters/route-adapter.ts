import type { Request, Response } from "express";
import type { Controller } from "@/interfaces/controller";
import type { HttpRequest } from "@/interfaces/http";

export const routeAdapter = (controller: Controller) => {
	return async (req: Request, res: Response) => {
		const httpRequest: HttpRequest = {
			body: req.body
		};

		const httpResponse = await controller.handle(httpRequest);
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
			return res.status(httpResponse.statusCode).json(httpResponse.body);
		}

		return res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
	};
};
