import { join } from "node:path";
import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

routes(app);
app.use(express.static(join(__dirname, "../../public")));

export { app };
