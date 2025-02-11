import { Transactions } from "./types";

const jwt = require("jsonwebtoken");

export const verifyToken = (req: any, res: any, next: any) => {
  const authorization = req.headers.authorization;
  const bearer = authorization && authorization.split(" ")[0];
  const token = authorization && authorization.split(" ")[1];

  if (bearer !== "Bearer" || token === undefined)
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });

  jwt.verify(token, process.env.JWT_KEY, (err: Error, user: any) => {
    if (err)
      return res
        .status(401)
        .json({ message: "Access token is missing or invalid" });

    next();
  });
};

export const verifyInternalToken = (req: any, res: any, next: any) => {
  const authorization = req.headers.authorization;
  const bearer = authorization && authorization.split(" ")[0];
  const token = authorization && authorization.split(" ")[1];

  if (bearer !== "Bearer" || token === undefined)
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });

  jwt.verify(token, process.env.INT_JWT, (err: Error, user: any) => {
    if (err)
      return res
        .status(401)
        .json({ message: "Access token is missing or invalid" });

    next();
  });
};

export const isTransaction = (info: any): boolean => {
  const transaction: Transactions = {
    user_id: "user_id",
    amount: 0,
    type: "CREDIT",
  };

  for (const key in transaction) {
    if (!(key in info)) return false;
  }
  if (info["type"] !== "CREDIT" && info["type"] !== "DEBIT") return false;
  if (Object.keys(info).length > 3) return false;
  return true;
};
