import type { Request, Response } from "express";
import { createAccount } from "./service.js";

export const createAccountController = async (
  req: Request,
  res: Response
) => {
  try {
    const account = await createAccount(req.body);

    res.status(201).json({
      success: true,
      data: account,
    });
  }
  catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
};
