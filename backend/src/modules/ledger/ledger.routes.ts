import { Router } from "express";
import { getHistory, getBalance, getBalanceAt } from "./ledger.controller.js";

const router = Router();

router.get("/:accountId/history", getHistory);
router.get("/:accountId/balance", getBalance);
router.get("/:accountId/balance-at", getBalanceAt);

export default router;
