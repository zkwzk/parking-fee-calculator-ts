import { FitResult } from "../../types";
import { parseTimeString } from "../../utils";
import { BaseFee } from "./BaseFee";

export class FixedFeePerEntry extends BaseFee {
    startTime: Date;
    endTime: Date;
    feePerEntry: number;
    constructor(startTime: string, endTime: string, feePerEntry: number) {
      super(startTime, endTime);
      this.startTime = parseTimeString(startTime);
      this.endTime = parseTimeString(endTime);
      this.feePerEntry = feePerEntry;
    }
  
  
    calculateCost = (fit: FitResult) : number => {
      return 0;
    }
  }