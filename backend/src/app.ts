import express from "express";
import accountRoutes from "./modules/account/routes.js";

const app = express();

app.use(express.json());

app.use("/accounts", accountRoutes);

export default app;
