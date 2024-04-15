import { LocalTime } from "@js-joda/core";
import { parseTimeString } from "../utils";

describe('utils', () => {
    it('should parse the date string to date', () => {
        expect(parseTimeString('10:00')).toEqual(LocalTime.of(10, 0));
    });
});
