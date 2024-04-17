import { ChronoUnit } from "@js-joda/core";
import { CalculationResult, FitResult, PreviousDayContext } from "../../types";
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
    subsequenceChargePerYMinutes: number,
    isAcrossDay: boolean = false
  ) {
    super(startTime, endTime, isAcrossDay);
    this.startTime = parseTimeString(startTime);
    this.endTime = parseTimeString(endTime);
    this.x = x;
    this.feeFirstXMintues = feeFirstXMintues;
    this.y = y;
    this.subsequenceChargePerYMinutes = subsequenceChargePerYMinutes;
  }
  calculateCost = (fit: FitResult, previousDayContext?: PreviousDayContext): CalculationResult => {
    if (!fit.isFit) return {cost: 0};
    const startTimeAfterXMins = fit.startTime!.plusMinutes(this.x);
    // if fit.endTime plus x minutes, means the car is still in the first x minutes, then return feeFirstXMintues
    if (!fit.endTime!.isAfter(startTimeAfterXMins)) {
      return {cost: this.feeFirstXMintues};
    }

    if (this.startTime.equals(this.endTime)) { return {cost: this.feeFirstXMintues}; }

    const timeDiff = startTimeAfterXMins.until(
      fit.endTime!,
      ChronoUnit.MINUTES
    );

    const chargeNumberOfYMintues = Math.ceil(timeDiff / this.y);

    return {cost: parseFloat(
      (
        this.feeFirstXMintues +
        chargeNumberOfYMintues * this.subsequenceChargePerYMinutes
      ).toFixed(2)
    )};
  };
}
