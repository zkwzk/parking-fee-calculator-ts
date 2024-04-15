import { parseTimeString } from "../utils";

describe('utils', () => {
    it('should parse the date string to date', () => {
        expect(parseTimeString('10:00')).toEqual(new Date(0, 0, 0, 10, 0, 0, 0));
    });
});
