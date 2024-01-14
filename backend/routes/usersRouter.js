import express from "express";
import {
  signUp,
  signIn,
  logout,
  getAccessToken,
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/users/signup", signUp);
router.post("/users/signin", signIn);
router.get("/users/logout", logout);
router.get("/users/refresh_token", getAccessToken);

export default router;
