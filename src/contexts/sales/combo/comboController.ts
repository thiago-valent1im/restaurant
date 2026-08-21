import { Request, Response } from "express";
import { CreateComboRequest } from "./comboType";
import { createCombo, getAllCombos } from "./comboService";
import { AuthRequest } from "../../../shared/auth/authType";

export async function create(req: Request, res: Response) {
  const { role } = (req as AuthRequest).authorization;
  const data: CreateComboRequest = req.body;

  if (role !== "admin") {
    throw new Error("Not allowed!");
  }

  try {
    const combo = await createCombo(data);

    res.send(combo);
  } catch (error) {
    res.send(error);
  }
}

export async function getAll(req: Request, res: Response) {
  const combos = await getAllCombos();
  res.send(combos);
}
