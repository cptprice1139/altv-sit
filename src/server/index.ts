import * as alt from 'alt-server';

let seats: string[] = [];

alt.onClient('altv-sit:server:sit', (player: alt.Player, coords: alt.Vector3) => seats.push(coords.toString()))

alt.onClient('altv-sit:server:cancel', (player: alt.Player, coords: alt.Vector3) => {
    for (let i in seats) seats[i] === coords.toString() && delete seats[i];
})

alt.onClient('altv-sit:server:trySit', (player: alt.Player, coords: alt.Vector3) => {
    if (seats.length === 0) return alt.emitClient(player, 'altv-sit:client:callback', false);
    for (let i in seats) seats[i] !== coords.toString() ? alt.emitClient(player, 'altv-sit:client:callback', true) : alt.emitClient(player, 'altv-sit:client:callback', false);
})