import { Router } from "express";
import { loginController, registerController } from "../controllers/authController.js";

const router = Router();

// routing
// Register (Post)
router.post("/register", registerController);

// Login (Post)
router.post("/login", loginController);

export default router;