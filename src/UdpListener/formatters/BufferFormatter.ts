import { sliceIntoNChunks } from "./ArraySplitters";
import {
  formatDecodedDataRow,
  formatRowEight,
  formatRowFive,
  formatRowFour,
  formatRowNine,
  formatRowOne,
  formatRowReserved,
  formatRowSeven,
  formatRowSix,
  formatRowThree,
  formatRowTwo,
  formatRowZero,
} from "./RowFormatter";

export const formatBufferToEightBinaryArrays = (msg: Buffer) => {
  const msgArray = [...msg];
  msgArray.splice(0, 2);

  const bytesToBitsObject = msgArray.map((byte) => {
    const bitsWithOutLeadingZeros = byte.toString(2);
    const bitsWithLeadingZeros =
      "00000000".substr(bitsWithOutLeadingZeros.length) +
      bitsWithOutLeadingZeros;
    return bitsWithLeadingZeros;
  });

  const unformattedBitString = bytesToBitsObject.join("");

  const splitIntoEightPackets = sliceIntoNChunks([...unformattedBitString]);

  const packetsWithFormats = splitIntoEightPackets.map((packet, index) => {
    const packetString = packet.join("");
    const packetSplitIntoRows = sliceIntoNChunks([...packetString], 45);

    const packetSplitIntoRowsWithCharsMerged = packetSplitIntoRows.map(
      (row, i) => `Row ${i.toString().padStart(2, "0")}: ${row.join("")}`
    );
    return packetSplitIntoRowsWithCharsMerged;
  });

  return packetsWithFormats;
};

export const formatPacketToJSON = (packet: Array<string>) => {
  const jsonIzedDataByRow = packet.map((fieldRow, i) => {
    if (i === 0) return formatRowZero(fieldRow.slice(8));
    if (i === 1) return formatRowOne(fieldRow.slice(8));
    if (i === 2) return formatRowTwo(fieldRow.slice(8));
    if (i === 3) return formatRowThree(fieldRow.slice(8));
    if (i === 4) return formatRowFour(fieldRow.slice(8));
    if (i === 5) return formatRowFive(fieldRow.slice(8));
    if (i === 6) return formatRowSix(fieldRow.slice(8));
    if (i === 7) return formatRowSeven(fieldRow.slice(8));
    if (i === 8) return formatRowEight(fieldRow.slice(8));
    if (i === 9) return formatRowNine(fieldRow.slice(8));
    if (i >= 10 && i <= 41) return formatDecodedDataRow(fieldRow.slice(8), i);

    return formatRowReserved(fieldRow.slice(8), i);
  });
  return jsonIzedDataByRow;
};
