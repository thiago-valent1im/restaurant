import express from "express";
import { create, getAll } from "./orderController";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);

export default router;
