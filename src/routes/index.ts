import { Router } from "express";
import { FeeCalculationController } from "../controllers/FeeCalculationController";

export function setRoutes(router: Router): void {
  const feeCalculationController = new FeeCalculationController();
  router.get("/calculateFee", feeCalculationController.getParkingFee);
}
