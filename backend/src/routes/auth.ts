import express from "express";
import authController from "../controllers/auth/authController";
import authRedirectController from "../controllers/auth/authRedirectController";

const router = express.Router();

router.get("/", authController);
router.get("/redirect", authRedirectController);

export default router;
