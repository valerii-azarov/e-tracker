import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "../controllers/transactionsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/transactions/add", auth, addTransaction);
router.delete("/transactions/:id", auth, deleteTransaction);
router.get("/transactions/all", auth, getTransactions);

export default router;
