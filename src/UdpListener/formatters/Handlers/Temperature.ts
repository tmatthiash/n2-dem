import { store } from "../../..";
import { twoComplementConvert } from "../converters/TwoComplementConvert";

export const handleTemperature = (packet: string[]) => {
    const tempBits = packet[16].slice(11, 27);
    const outsideTempBits = packet[22].slice(11, 27);
    const temp = (twoComplementConvert(tempBits) * 0.00390625).toFixed(3);
    const outsideTemp = (twoComplementConvert(outsideTempBits) * 0.00390625).toFixed(3);

    store.dispatch({
        type: "SET_TEMPERATURE",
        temperature: `Temperature ${temp}, outside ${outsideTemp}`,
    });
};
