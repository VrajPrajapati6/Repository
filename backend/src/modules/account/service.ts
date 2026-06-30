import prisma from "../../config/prisma.js";
import type { CreateAccountInput } from "./types.js";

export const createAccount = async (
  data: CreateAccountInput
) => {
  const account = await prisma.account.create({
    data,
  });

  return account;
};
