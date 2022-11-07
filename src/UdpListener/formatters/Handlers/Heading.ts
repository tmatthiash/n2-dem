import { twoComplementConvert } from './../converters/TwoComplementConvert';
import { store } from "../../..";

export const handleHeading = (packet: string[]) => {
    const headingBits = packet[18].slice(11, 27);
    const headingSemiCircle = twoComplementConvert(headingBits) * 3.05e-5
    // const fuelNum = twoComplementConvert(fuelBits);
    // const realFuelAmmount = fuelNum * FUEL_LSB;
    let headingInDegrees = 360;
    if(headingSemiCircle > 0) {
        headingInDegrees = headingSemiCircle * 180;
    } else if (headingSemiCircle < 0) {
        headingInDegrees = ((1 + headingSemiCircle) * 180) + 180;
    }

    store.dispatch({
        type: "SET_HEADING",
        heading: `Heading: ${headingInDegrees.toFixed(1)}`,
    });
};
