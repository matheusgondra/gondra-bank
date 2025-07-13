export interface HttpRequest {
	body?: any;
	authorization?: string;
	userId?: number;
}

export interface HttpResponse {
	statusCode: number;
	body: any;
}
