import { store } from "../../..";

export const handleCallsign = (packet: string[]) => {
    const callsignBitsOne = packet[20].slice(11, 27);
    const callsignBitsTwo = packet[21].slice(11, 27);
    const callsignBitsThree = packet[22].slice(11, 27);
    const callsignBitsFour = packet[23].slice(11, 27);
    const callsignBus = packet[0].slice(8,12)

    store.dispatch({
        type: "SET_CALLSIGN",
        callsign: `Bits one ${callsignBitsOne} \ntwo ${callsignBitsTwo} \nthree ${callsignBitsThree} \nfour ${callsignBitsFour} \n bus: ${callsignBus}`,
    });
};
