import { Request, Response } from "express";
import { feeCalculationService } from "../services/feeCalculationService";

export class HelloWorldController {
  public getHelloWorld(req: Request, res: Response): void {
    console.log("getHelloWorld called");
    res.send(feeCalculationService.sayHello());
  }
}
