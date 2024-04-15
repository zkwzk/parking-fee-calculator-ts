import { LocalDateTime, LocalTime } from "@js-joda/core";

export function parseTimeString(dateStr: string): LocalTime {
    return LocalTime.parse(dateStr);
}
