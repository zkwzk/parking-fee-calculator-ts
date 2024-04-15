import { FixedFeePerEntry } from "./services/fee/FixedFeePerEntry";
import { FixedFeePerXMinutes } from "./services/fee/FixedFeePerXMinutes";
import { FixedFirstXMinutes } from "./services/fee/FixedFirstXMinutes";
import { CarPark } from "./types";

const gracePeriodInMinutes = 15;

const plazaSingapuraCarWeekday0to1759: FixedFirstXMinutes = new FixedFirstXMinutes( '00:00', '17:59',60, 1.95,15,0.55);
const plazaSingapuraCarWeekday18to2359: FixedFeePerEntry = new FixedFeePerEntry('18:00','23:59', 3.25)

const plazaSingapuraCarWeekendPH0to0259: FixedFeePerXMinutes = new FixedFeePerXMinutes("00:00", "02:59",15, 0.55);
const plazaSingapuraCarWeekendPH03to1759: FixedFirstXMinutes = new FixedFirstXMinutes("03:00", "17:59", 120, 3.25, 15, 0.55);
const plazaSingapuraCarWeekend18to2359: FixedFeePerEntry = new FixedFeePerEntry('18:00','23:59', 3.25)

const plazaSingapuraMotorcyclePerEntry: FixedFeePerEntry = new FixedFeePerEntry('00:00','23:59', 1.30);

const plazaSingapuraCarPark : CarPark = {
    name: 'Plaza Singapura',
    gracePeriodInMinutes: 15,
    carFee: {
        weekdayFeeRules: [plazaSingapuraCarWeekday0to1759, plazaSingapuraCarWeekday18to2359],
        weekendPHFeeRules: [plazaSingapuraCarWeekendPH0to0259, plazaSingapuraCarWeekendPH03to1759, plazaSingapuraCarWeekend18to2359]
    },
    motocycleFee: {
        feeRules: [plazaSingapuraMotorcyclePerEntry]
    }
}
