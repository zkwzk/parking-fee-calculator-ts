import { LocalTime } from "@js-joda/core";
import { FixedFeePerXMinutes } from "../FixedFeePerXMinutes";

describe('FixedFeePerXMinutes', () => {
    const configStartTime = '10:00';
    const configEndTime = '16:00';
    const configX = 15;
    const configXMinutesFee = 0.5;
    const fixedFeePerXMinutes = new FixedFeePerXMinutes(configStartTime, configEndTime, configX, configXMinutesFee);
    describe('calculateCost', () => {
        it('should return 2 for a if its within the configed time period', () => {
            const mockFitResult = {
                startTime: LocalTime.parse("10:00"),
                endTime: LocalTime.parse("11:00"),
                isFit: true
            }

            expect(fixedFeePerXMinutes.calculateCost(mockFitResult)).toBe(2);
        });

        it('should round to the next x minutes', () => {
            const mockFitResult = {
                startTime: LocalTime.of(10,0,0),
                endTime: LocalTime.of(10,16),
                isFit: true
            }

            expect(fixedFeePerXMinutes.calculateCost(mockFitResult)).toBe(1);
        });

        it('should return 0 if not fit', () => {
            const mockFitResult = {
                startTime: LocalTime.parse("10:00"),
                endTime: LocalTime.parse("11:00"),
                isFit: false
            }

            expect(fixedFeePerXMinutes.calculateCost(mockFitResult)).toBe(0);
        });

        it('should return 1 unit of fee if start time is the same with end time', () => {
            const mockFitResult = {
                startTime: LocalTime.parse("10:00"),
                endTime: LocalTime.parse("10:00"),
                isFit: true
            }

            expect(fixedFeePerXMinutes.calculateCost(mockFitResult)).toBe(0.5);
        });
    });
});