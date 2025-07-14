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

app.use(express.static("public"));
routes(app);

export { app };
