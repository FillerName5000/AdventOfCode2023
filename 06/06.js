"use strict";
const STARTING_SPEED = 0;
const SPEED_INCREASE_PER_MS = 1;
class WhatAreYouDoingInMySwampError extends Error {
}
/*Time:        53     71     78     80
Distance:   275   1181   1215   1524*/
const actualTimesAndRecords = new Map([[53717880, 275118112151524]]);
function main() {
    const waysToBeatRecord = [];
    for (const [time, record] of actualTimesAndRecords) {
        const minRec = getMinimumRecordSettingMs(time, record);
        if (minRec >= 0) {
            const maxRec = getMaximumRecordSettingMs(time, minRec);
            waysToBeatRecord.push(getWaysToBeatRecord(minRec, maxRec));
        }
    }
    console.log(waysToBeatRecord[0]);
}
function getMinimumRecordSettingMs(raceMs, recordToBeat) {
    for (let i = 0; i < raceMs; i++) {
        if (calcDistance(raceMs, i) > recordToBeat)
            return i;
    }
    return -1; //record's unbeaten, nothing to add
}
function getMaximumRecordSettingMs(raceMs, minRecordSettingMs) {
    return raceMs - minRecordSettingMs; //mirrored
}
function getWaysToBeatRecord(min, max) {
    return max - min + 1; // including bounds
}
function calcDistance(raceMs, buttonPressMs) {
    if (raceMs < buttonPressMs)
        throw new WhatAreYouDoingInMySwampError("skill issue.");
    const speedPerMs = STARTING_SPEED + (buttonPressMs * SPEED_INCREASE_PER_MS);
    const travelTimeMs = raceMs - buttonPressMs;
    return speedPerMs * travelTimeMs;
}
main();
