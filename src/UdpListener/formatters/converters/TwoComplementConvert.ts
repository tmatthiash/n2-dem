export const twoComplementConvert = (bits: string) => {
    if (bits[0] === "1") {
        const bitsBaseTen = parseInt(bits,2);
        const allOnes = parseInt(bits.replaceAll("0","1"), 2);
        return ((bitsBaseTen ^ allOnes) * -1) - 1;
    } else {
        return parseInt(bits, 2);
    }
};
