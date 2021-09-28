import * as alt from 'alt-client';
import * as native from 'natives';
import {data, pps} from "./config";

let sitting = false;

alt.on('keydown', key => {
    if (key === 69) {
        for (let i in pps) {
            let name = pps[i];
            let object = native.getClosestObjectOfType(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 2.0, alt.hash(name), false, false, false);
            if (object) sitting ? Cancel() : Sit(object, name);
        }
    }
})

function Sit(object: number, name: string) {
    if (sitting) return;

    let pos = native.getEntityCoords(object, false);

    Object.entries(data).forEach(
        ([key, value]) => {
            if (key === name) {
                native.taskStartScenarioAtPosition(alt.Player.local, value.scenario, pos.x, pos.y, pos.z + (alt.Player.local.pos.z - pos.z) / 2, native.getEntityHeading(object) + 180.0, 0, true, false);
            }
        }
    );

    sitting = true;
}

function Cancel() {
    if (!sitting) return;

    native.clearPedTasks(alt.Player.local);

    sitting = false;
}