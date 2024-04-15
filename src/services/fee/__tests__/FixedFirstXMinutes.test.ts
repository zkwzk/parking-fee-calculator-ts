import { LocalTime } from "@js-joda/core";
import { FixedFirstXMinutes } from "../FixedFirstXMinutes";

describe('FixedFirstXMinutes', () => {
    const configStartTime = '10:00';
    const configEndTime = '16:00';
    const configX = 120;
    const configY = 15;
    const configXMinutesFee = 5;
    const configSubsequenceChargePerYMinutes = 0.55;
    const fixedFeePerXMinutes = new FixedFirstXMinutes(configStartTime, configEndTime, configX, configXMinutesFee, configY, configSubsequenceChargePerYMinutes);
    const mockFitResult = {
        startTime: LocalTime.of(10,0),
        endTime: LocalTime.of(11,0),
        isFit: true
    }
    describe('calculateCost', () => {
        it('should return configXMinutesFee if its within the configed time period', () => {
            expect(fixedFeePerXMinutes.calculateCost(mockFitResult)).toBe(configXMinutesFee);
        });

        it('should return x minutes fee and the subsequence charge if the car stay longer than x minutes', () => {
            const endTime = LocalTime.of(13,0);
            expect(fixedFeePerXMinutes.calculateCost({...mockFitResult, endTime})).toBe(configXMinutesFee + configSubsequenceChargePerYMinutes * 4);
        });

        it('should round to the next y minutes', () => {
            const endTime = LocalTime.of(13,7);
            expect(fixedFeePerXMinutes.calculateCost({...mockFitResult, endTime})).toBe(configXMinutesFee + configSubsequenceChargePerYMinutes * 5);
        });

        it('should return 0 if not fit', () => {
            expect(fixedFeePerXMinutes.calculateCost({...mockFitResult, isFit: false})).toBe(0);
        })
    });
});