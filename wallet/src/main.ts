import { getTransactions } from "./get-transactions";
import { getBalance } from "./get-balance";
import { postTransactions } from "./post-transactions";
import { verifyInternalToken, verifyToken } from "./utils";
import { getTransactionsId } from "./get-transactions-id";
import { getBalanceId } from "./get-balance-id";
const express = require("express");

const port = 3001;
const app = express();
app.use(express.json());
app.post("/transactions", verifyToken, postTransactions);
app.post("/transactions/:id", verifyInternalToken, postTransactions);
app.get("/transactions", verifyToken, getTransactions);
app.get("/transactions/:id", verifyInternalToken, getTransactionsId);
app.get("/balance", verifyToken, getBalance);
app.get("/balance/:id", verifyInternalToken, getBalanceId);
app.use((req: any, res: any, next: any) => {
  res.status(404).send("<h1>Error 404</h1>\n<h1>Page not found</h1>");
});
app.listen(port);
