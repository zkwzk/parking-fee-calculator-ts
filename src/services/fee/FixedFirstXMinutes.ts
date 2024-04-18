import { ChronoUnit } from "@js-joda/core";
import { FitResult } from "../../types";
import { parseTimeString } from "../../utils";
import { BaseFee } from "./BaseFee";

export class FixedFirstXMinutes extends BaseFee {
  x: number;
  y: number;
  feeFirstXMintues: number;
  subsequenceChargePerYMinutes: number;
  constructor(
    startTime: string,
    endTime: string,
    x: number,
    feeFirstXMintues: number,
    y: number,
    subsequenceChargePerYMinutes: number
  ) {
    super(startTime, endTime);
    this.startTime = parseTimeString(startTime);
    this.endTime = parseTimeString(endTime);
    this.x = x;
    this.feeFirstXMintues = feeFirstXMintues;
    this.y = y;
    this.subsequenceChargePerYMinutes = subsequenceChargePerYMinutes;
  }
  calculateCost: (fit: FitResult) => number = (fit: FitResult): number => {
    // task #1
    // TODO: implement the calculateCost method
    return 0;
  };
}
