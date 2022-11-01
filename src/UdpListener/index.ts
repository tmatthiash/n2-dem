// import dgram from "dgram";
import util from "util";
import fs from "fs";
import path from "path";
import {
    formatBufferToEightBinaryArrays,
    formatPacketToJSON,
} from "./formatters/BufferFormatter";
import { sliceIntoNSizeChunks } from "./formatters/ArraySplitters";
import { store } from "..";

const dgram = window.require("dgram");

export const server = dgram.createSocket({ type: "udp4", reuseAddr: true });

// const decodeBody = (buff: Buffer) => {
//   const bitArray = [...buff.toString()]
//     .map((number) => ("00000000" + number.toString(2)).slice(-8)) // '00000111'
//     .join("")
//     .split("");
//     console.log("There are ", bitArray.length, "bits")

//   return sliceIntoNSizeChunks(bitArray, 1440).map((chunk) => sliceIntoNSizeChunks(chunk, 32));
// };
// // return sliceIntoNChunks(bitArray).map((chunk) => sliceIntoNSizeChunks(chunk));

// const decode = (buf: Buffer) => {
//   var len = buf.readUInt16BE(4);
//   return {
//     sourcePort: buf.readUInt16BE(0),
//     destinationPort: buf.readUInt16BE(2),
//     length: len,
//     checksum: buf.readUInt16BE(6),
//     // data: decodeBody(buf.slice(8, len)),
//     data: decodeBody(buf)
//   };
// };

server.on("message", (msg: Buffer, rinfo: any) => {
    const binaryPackets = formatBufferToEightBinaryArrays(msg);

    // store.dispatch({ type: "SET_MESSAGE_BLOCK", msgBlock: binaryPackets });

    // console.log(binaryPackets);
    const firstPacketFormattedToJSON = formatPacketToJSON(binaryPackets[0]);

    console.log(firstPacketFormattedToJSON);

    // store.dispatch({
    //     type: "SET_MESSAGE",
    //     message: JSON.stringify(binaryPackets[0][7]),
    // });

    // const firstBlock = binaryPackets[0];
    for (let i = 0; i < binaryPackets.length; i++) {
        const lineSeven = binaryPackets[i][7];
        const command = lineSeven.slice(11, 22);
        if (command === "01111100110") {
            store.dispatch({ type: "INCREMENT_COUNT" });
            // store.dispatch({ type: "SET_MESSAGE", message: lineSeven });
            const unalteredAltitudeValue = parseInt(
                binaryPackets[i][19].slice(11, 27),
                2
            );

            const velocityEastMSW = binaryPackets[i][20].slice(11, 27);
            const velocityEastLSW = binaryPackets[i][21].slice(11, 27);

            const combinedVelocityEast = velocityEastMSW + velocityEastLSW;
            const unalteredVelocityEastValue = ~~parseInt(
                combinedVelocityEast,
                2
            );

            store.dispatch({
                type: "SET_MESSAGE",
                message: `Altitude is maybe: ${
                    unalteredAltitudeValue * 4
                }ft, also ${unalteredVelocityEastValue} ft/sec`,
            });
        }
        // store.dispatch({
        //     type: "SET_MESSAGE",
        //     message: JSON.stringify(`${lineSeven} subset: ${command}`),
        // });

        // if (lineSeven === "00110111101") {
        //     store.dispatch({ type: "INCREMENT_COUNT" });
        // }
    }

    // const report = `server got: ${util.inspect(
    //   decode(msg),{
    //     depth: null
    //   }
    // )} from ${rinfo.address}:${rinfo.port}`;
    // console.log(report);

    // fs.writeFileSync(
    //   path.resolve(__dirname, "./buffer.json"),
    //   JSON.stringify(msg)
    // );

    // fs.writeFileSync(
    //   path.resolve(__dirname, "./report.json"),
    //   JSON.stringify(decode(msg))
    // );
    // server.close();
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
