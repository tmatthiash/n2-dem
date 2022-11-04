export const twoComplementConvert = (bits: string) => {
    if (bits[0] === "1") {
        let flipped = "";

        for (let i = 0; i < bits.length; i++) {
            if (bits[i] === "0") {
                flipped += "1";
            } else {
                flipped += "0";
            }
        }
        return parseInt(flipped, 2) * -1 - 1;
    } else {
        return parseInt(bits, 2);
    }
};
