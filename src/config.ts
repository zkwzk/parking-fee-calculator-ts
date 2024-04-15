import { FeeRule, FixedFeePerEntry, FixedFeePerXMinutes, FixedFirstXMinutes } from "./types";

const gracePeriodInMinutes = 15;

const plazaSingapuraCarWeekday0to1759: FeeRule<FixedFirstXMinutes> = {
    startTime: '00:00',
    endTime: '17:59',
    fee: {
        x: 60,
        feeFirstXMintues: 1.95,
        y: 15,
        subsequenceChargePerYMinutes: 0.55
    }
}

const plazaSingapuraCarWeekday18to2359: FixedFeePerEntry = new FixedFeePerEntry('18:00','23:59', 3.25)

const plazaSingapuraCarWeekendPH0to0259: FeeRule<FixedFeePerXMinutes> = {
    x: 15,
    feePerXMinutes: 0.55
}

const plazaSingapuraCarWeekendPH03to1759: FixedFirstXMinutes = {
    x: 120,
    feeFirstXMintues: 3.25,
    y: 15,
    subsequenceChargePerYMinutes: 0.55
}

const plazaSingapuraCarWeekend18to2359: FixedFeePerEntry = new FixedFeePerEntry('18:00','23:59', 3.25)

