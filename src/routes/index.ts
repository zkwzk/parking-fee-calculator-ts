import { Router } from "express";
import { HelloWorldController } from "../controllers/FeeCalculationController";

export function setRoutes(router: Router): void {
  const helloWorldController = new HelloWorldController();
  router.get("/hello", helloWorldController.getHelloWorld);
}
