import { handleCallsign } from './formatters/Handlers/Callsign';
import { handleFuel } from "./formatters/Handlers/Fuel";
// import dgram from "dgram";
import {
    formatBufferToEightBinaryArrays,
    formatPacketToJSON,
} from "./formatters/BufferFormatter";
import { store } from "..";
import { handleLatLon } from "./formatters/Handlers/LatLon";
import { handleTemperature } from './formatters/Handlers/Temperature';

const dgram = window.require("dgram");

export const server = dgram.createSocket({ type: "udp4", reuseAddr: true });

server.on("message", (msg: Buffer, rinfo: any) => {
    const binaryPackets = formatBufferToEightBinaryArrays(msg);
    const firstPacketFormattedToJSON = formatPacketToJSON(binaryPackets[0]);

    console.log(firstPacketFormattedToJSON);

    for (let i = 0; i < binaryPackets.length; i++) {
        const lineSeven = binaryPackets[i][7];
        const command = lineSeven.slice(11, 22);
        if (command === "01111100110") {
            store.dispatch({ type: "INCREMENT_COUNT" });

            handleLatLon(binaryPackets[i]);
            const unalteredAltitudeValue = ~~parseInt(
                binaryPackets[i][18].slice(11, 27),
                2
            );

            const velocityEastMSW = binaryPackets[i][19].slice(11, 27);
            const velocityEastLSW = binaryPackets[i][20].slice(11, 27);

            const combinedVelocityEast = velocityEastMSW + velocityEastLSW;
            const unalteredVelocityEastValue = ~~parseInt(
                combinedVelocityEast,
                2
            );

            const velocityNorthMSW = binaryPackets[i][21].slice(11, 27);
            const velocityNorthLSW = binaryPackets[i][22].slice(11, 27);

            const combinedVelocityNorth = velocityNorthMSW + velocityNorthLSW;
            const unalteredVelocityNorthValue = ~~parseInt(
                combinedVelocityNorth,
                2
            );

            const totalSpeed = Math.sqrt(
                Math.pow(unalteredVelocityEastValue * 1.91e-6, 2) +
                    Math.pow(unalteredVelocityNorthValue * 1.91e-6, 2)
            );

            store.dispatch({
                type: "SET_MESSAGE",
                message: `Altitude is maybe: ${
                    unalteredAltitudeValue * 4
                }ft, \nalso ${(unalteredVelocityEastValue * 1.91e-6).toFixed(
                    4
                )} ft/sec E \n also ${(
                    unalteredVelocityNorthValue * 1.91e-6
                ).toFixed(4)} ft/sec N \n total: ${totalSpeed.toFixed(4)}`,
            });
        }
        if (command === "01010100101") {
            handleFuel(binaryPackets[i]);
        }
        // if (command === "10000100001") {
        //     handleCallsign(binaryPackets[i])
        // }
        if (command === "11100111000") {
            handleTemperature(binaryPackets[i])
        }
    }
});

server.on("error", (err: { stack: any }) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(60084);
