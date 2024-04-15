import { ChronoUnit, DayOfWeek, LocalDate, LocalDateTime, LocalTime } from "@js-joda/core";
import { CalculateDaysResult, CarPark } from "../../types";
import { parseTimeString } from "../../utils";

export class FeeCalculator {
    checkGracePeriod = (startTime: string, endTime: string, gracePeriodInMinutes: number): boolean => {
        const parsedStartTime = parseTimeString(startTime);
        const parsedEndTime = parseTimeString(endTime);
        const timeDiff = parsedStartTime.until(parsedEndTime, ChronoUnit.MINUTES);
        return timeDiff <= gracePeriodInMinutes;
    }

    checkIsSameDay = (startDateTime: string, endDateTime: string): boolean => {
        const parseStartDateTime = new Date(startDateTime);
        const parseEndDateTime = new Date(endDateTime);
        return new Date(parseStartDateTime.getFullYear(), parseStartDateTime.getMonth(), parseStartDateTime.getDate()).getTime() === new Date(parseEndDateTime.getFullYear(), parseEndDateTime.getMonth(), parseEndDateTime.getDate()).getTime();
    }

    checkIsWeekend = (date: LocalDate): boolean => {
        return date.dayOfWeek() == DayOfWeek.SATURDAY || date.dayOfWeek() == DayOfWeek.SUNDAY;
    }

    calculateDays = (startDateTime: string, endDateTime: string): CalculateDaysResult[] => {
        const parseStartDateTime = LocalDateTime.parse(startDateTime);
        const parseEndDateTime = LocalDateTime.parse(endDateTime);
        const result = [] as CalculateDaysResult[];

        // startDate "2021-01-01T00:00:00"
        // end "2021-01-01T02:00:00"
        // current "2021-01-01T00:00:00"
        // current + 1 day : "2021-01-02T00:00:00"
        let currentDate = parseStartDateTime.toLocalDate();
        let currentStartTime = parseStartDateTime.toLocalTime();
        let currentEndTime = parseEndDateTime.toLocalTime();
        if (this.checkIsSameDay(startDateTime, endDateTime)) {
            return [{
                dayStartTime: currentStartTime,
                dayEndTime: currentEndTime,
                isWeekendOrPH: this.checkIsWeekend(parseStartDateTime.toLocalDate())
            }]
        }
       
        do {
            result.push({
                dayStartTime: currentStartTime,
                dayEndTime: LocalTime.of(23, 59),
                isWeekendOrPH: this.checkIsWeekend(currentDate)
            })

            currentDate = currentDate.plusDays(1);
            currentStartTime = LocalTime.of(0, 0);
            currentEndTime = LocalTime.of(23, 59);
        } while (currentDate.isBefore(parseEndDateTime.toLocalDate()));
        result.push({
            dayStartTime: LocalTime.of(0, 0),
            dayEndTime: parseEndDateTime.toLocalTime(),
            isWeekendOrPH: this.checkIsWeekend(currentDate)
        })

        return result;
    }
    //    calculateParkingFee = (startTime: string, endTime: string, carpark: CarPark) : number => {

    //    }
}