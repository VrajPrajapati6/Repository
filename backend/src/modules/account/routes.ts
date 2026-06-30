import { Router } from "express";
import { createAccountController } from "./controller.js";

const router = Router();

router.post("/", createAccountController);

export default router;
