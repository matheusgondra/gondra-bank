import type { HttpRequest, HttpResponse } from "./http";

export interface Middleware {
	handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
