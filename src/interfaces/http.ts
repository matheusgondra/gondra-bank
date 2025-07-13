export interface HttpRequest {
	body?: any;
	authorization?: string;
}

export interface HttpResponse {
	statusCode: number;
	body: any;
}
