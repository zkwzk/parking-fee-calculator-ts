import { FitResult } from "../../../types";
import { parseTimeString } from "../../../utils";
import { FixedFeePerEntry } from "../FixedFeePerEntry";
describe('FixedFeePerEntry', () => {
    const configStartTime = '10:00';
    const configEndTime = '12:00';
    const feeRate = 5;
    const mockFitResult: FitResult = {
        startTime: parseTimeString(configStartTime),
        endTime: parseTimeString(configEndTime),
        isFit: true
    }
    const fixedFeePerEntry = new FixedFeePerEntry(configStartTime, configEndTime, feeRate);

    const firstDayRule = new FixedFeePerEntry("18:00", "23:59", feeRate, true);
    const mockFirstDayFitResult: FitResult = {
        startTime: parseTimeString("18:01"),
        endTime: parseTimeString("23:59"),
        isFit: true
    }
    const secondDayRule = new FixedFeePerEntry("00:00", "06:00", feeRate, true);
    const mockSecondDayFitResult: FitResult = {
        startTime: parseTimeString("00:00"),
        endTime: parseTimeString("02:00"),
        isFit: true
    }

    const previousDayContext = { isFirstXCharged: true };
    describe('calculateCost', () => {
        it('should return 5 for a if its within the configed time period', () => {
            expect(fixedFeePerEntry.calculateCost(mockFitResult)).toStrictEqual({ cost: feeRate});
        });

        it('should return 0 if not fit', () => {
            expect(fixedFeePerEntry.calculateCost({ ...mockFitResult, isFit: false })).toStrictEqual({cost: 0});
        })

        it('should return previousDay context', () => {
            expect(firstDayRule.calculateCost(mockFirstDayFitResult)).toStrictEqual({ cost: 5, previousDayContext });
        })

        it('should return 0 and no previousDay context for the second day', () => {
            expect(secondDayRule.calculateCost(mockSecondDayFitResult, previousDayContext)).toStrictEqual({ cost: 0});
        });
    });
});
