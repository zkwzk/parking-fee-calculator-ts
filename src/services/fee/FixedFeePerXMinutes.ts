import { ChronoUnit, LocalDate, LocalTime } from "@js-joda/core";
import { BaseFee } from "./BaseFee";
import { CalculationResult, FitResult, PreviousDayContext } from "../../types";

export class FixedFeePerXMinutes extends BaseFee {
    feePerXMinutes: number;
    x: number;
    constructor(startTime: string, endTime: string, x: number, feePerXMinutes: number) {
        super(startTime, endTime);
        this.feePerXMinutes = feePerXMinutes;
        this.x = x;
    }

    calculateCost = (fit: FitResult, previousDayContext?: PreviousDayContext): CalculationResult => {
        if(!fit.isFit) { return {cost: 0} }
        if(fit.startTime!.equals(fit.endTime!)) { return {cost: this.feePerXMinutes}; }
        const timeDiff = fit.startTime!.until(fit.endTime!, ChronoUnit.MINUTES);
        const chargeNumberOfXMintues = Math.ceil(timeDiff / this.x);
        return {cost:parseFloat((chargeNumberOfXMintues * this.feePerXMinutes).toFixed(2))};
    }
}