import express from "express";
import { create } from "./customerController";

const router = express.Router();

router.post("/", create);

export default router;
