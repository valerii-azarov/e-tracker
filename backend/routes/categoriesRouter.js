import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categoriesController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/categories/add", auth, addCategory);
router.delete("/categories/:id", auth, deleteCategory);
router.get("/categories/all", auth, getCategories);

export default router;
