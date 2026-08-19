import express from "express";
import { create } from "./orderController";

const router = express.Router();

router.post("/", create);

export default router;
