export function parseTimeString(dateStr: string): Date {
    const parsedStartTime = new Date(0, 0, 0, 0, 0, 0, 0);
    parsedStartTime.setHours(Number(dateStr.split(':')[0]));
    parsedStartTime.setMinutes(Number(dateStr.split(':')[1]));
    parsedStartTime.setSeconds(0);
    parsedStartTime.setMilliseconds(0);
    return parsedStartTime;
}
