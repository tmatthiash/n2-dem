import { store } from "../../..";

const FUEL_LSB = 12.5;

export const handleFuel = (packet: string[]) => {
    const fuelBits = packet[13].slice(11, 27);
    const fuelNum = ~~parseInt(fuelBits, 2);
    const realFuelAmmount = fuelNum * FUEL_LSB;

    store.dispatch({
        type: "SET_FUEL",
        fuel: `Fuel pounds: ${realFuelAmmount}`,
    });
};
