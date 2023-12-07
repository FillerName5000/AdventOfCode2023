"use strict";
const STARTING_SPEED = 0;
const SPEED_INCREASE_PER_MS = 1;
class WhatAreYouDoingInMySwampError extends Error {
}
/*  Time:        53     71     78     80
    Distance:   275   1181   1215   1524 */
const actualTimesAndRecords = new Map([[53, 275],
    [71, 1181],
    [78, 1215],
    [80, 1524]]);
function main() {
    const waysToBeatRecord = [];
    for (const time in actualTimesAndRecords) {
        const timeInt = parseInt(time);
        const res = actualTimesAndRecords.get(timeInt);
        let recordToBeat;
        if (res !== undefined) {
            recordToBeat = res;
        }
        else {
            throw new WhatAreYouDoingInMySwampError("Skill issue");
        }
        const minRec = getMinimumRecordSettingMs(timeInt, recordToBeat);
        if (minRec >= 0) {
            const maxRec = getMaximumRecordSettingMs(timeInt, minRec);
            waysToBeatRecord.push(getWaysToBeatRecord(minRec, maxRec));
        }
        console.log(waysToBeatRecord);
    }
}
function getMinimumRecordSettingMs(raceMs, recordToBeat) {
    for (let i = 1; i < raceMs; i++) {
        if (calcDistance(raceMs, i) > recordToBeat)
            return raceMs;
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
