import { middlewareAdapter } from "@/main/adapters/middleware-adapter";
import { makeAuthMiddleware } from "@/main/factories/auth-middleware-factory";

export const auth = middlewareAdapter(makeAuthMiddleware());
