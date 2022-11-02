import { store } from "../../..";

export const handleLatLon = (packet: string[]) => {
    const latitudeMSW = packet[14].slice(11, 27);
    const latitudeLSW = packet[15].slice(11, 27);
    const combinedLatitude = latitudeMSW + latitudeLSW;
    const latSemiCircle = ~~parseInt(combinedLatitude, 2);
    const latDegrees = (latSemiCircle * 180) / 2147483648;

    const longitudeMSW = packet[16].slice(11, 27);
    const longitudeLSW = packet[17].slice(11, 27);
    const combinedLongitude = longitudeMSW + longitudeLSW;
    const lonSemiCircle = ~~parseInt(combinedLongitude, 2);
    const lonDegrees = (lonSemiCircle * 180) / 2147483648;

    store.dispatch({
        type: "SET_LATLON",
        latLon: `lat: ${latDegrees}  lon: ${lonDegrees}`,
    });
};
