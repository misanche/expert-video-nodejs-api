import { Router } from "express";
import { getExchangeHandler } from "../controllers/exchange";
import { asyncHandler } from "../lib/asyncHandler";
export const exchangeGet  = Router().use("/", asyncHandler(getExchangeHandler, "helloWorldGet"));
