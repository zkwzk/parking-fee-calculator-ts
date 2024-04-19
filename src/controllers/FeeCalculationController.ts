import { Request, Response } from "express";
import { VEHICLE_TYPE } from "../types";
import { feeCalculationService } from "../services/FeeCalculationService";

export class FeeCalculationController {
  public getParkingFee(req: Request, res: Response): void {
    console.log("getHelloWorld called");
    res.send(JSON.stringify(feeCalculationService.getParkingFeeByCarpark('2024-03-20T00:00', '2024-03-20T23:59', VEHICLE_TYPE.CAR)));
  }
}
