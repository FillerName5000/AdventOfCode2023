const STARTING_SPEED = 0;
const SPEED_INCREASE_PER_MS = 1;
class WhatAreYouDoingInMySwampError extends Error {}
/*  Time:        53     71     78     80
    Distance:   275   1181   1215   1524 */
const actualTimesAndRecords = new Map<number, number>([ [53, 275],
                                                        [71, 1181],
                                                        [78, 1215],
                                                        [80, 1524]]);

function main(): void {
    const waysToBeatRecord = [];
    for (const [time, record] of actualTimesAndRecords) {
        const minRec = getMinimumRecordSettingMs(time, record);
        if (minRec >= 0) {
            const maxRec = getMaximumRecordSettingMs(time, minRec);
            waysToBeatRecord.push(getWaysToBeatRecord(minRec, maxRec));
        }
        console.log(waysToBeatRecord);
    }

    const res = waysToBeatRecord.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
    console.log(res);
}

function getMinimumRecordSettingMs(raceMs: number, recordToBeat: number): number {
    for(let i = 0; i < raceMs; i++) { 
        if (calcDistance(raceMs, i) > recordToBeat) return i;
    }
    return -1; //record's unbeaten, nothing to add
}

function getMaximumRecordSettingMs(raceMs: number, minRecordSettingMs: number): number {
    return raceMs - minRecordSettingMs; //mirrored
}

function getWaysToBeatRecord(min: number, max: number): number {
    return max - min + 1;// including bounds
}

function calcDistance(raceMs: number, buttonPressMs: number): number {
    if (raceMs < buttonPressMs) throw new WhatAreYouDoingInMySwampError("skill issue.");
    const speedPerMs = STARTING_SPEED + (buttonPressMs * SPEED_INCREASE_PER_MS);
    const travelTimeMs = raceMs - buttonPressMs;

    return speedPerMs * travelTimeMs;
}

main();