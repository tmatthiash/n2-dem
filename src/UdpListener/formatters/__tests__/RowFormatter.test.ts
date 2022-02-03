import {
  formatRowFive,
  formatRowFour,
  formatRowSeven,
  formatRowSix,
  formatRowThree,
  formatRowTwo,
  formatRowZero,
  formatRowEight,
  formatRowNine,
  formatDecodedDataRow,
  formatRowReserved
} from "../RowFormatter";
import { formatRowOne } from "../RowFormatter";

describe("Row formatters", () => {
  describe("Row zero formatter", () => {
    let returnJson: { rowZeroData: any };
    const rowZeroString = "10111001000010011101011000000000";

    beforeEach(() => {
      returnJson = formatRowZero(rowZeroString);
    });

    it("should format the string correctly", () => {
      expect(returnJson.rowZeroData.busLetter).toEqual("1011");
      expect(returnJson.rowZeroData.oxNine).toEqual("1001");
      expect(returnJson.rowZeroData.oxZero).toEqual("0000");
      expect(returnJson.rowZeroData.otherOxNine).toEqual("1001");
      expect(returnJson.rowZeroData.eightBitsHighPktCntr).toEqual("11010110");
      expect(returnJson.rowZeroData.zeros).toEqual("00000000");
    });
  });

  describe("Row one formatter", () => {
    let returnJson: { rowOneData: any };
    const rowOneString = "11100010111000000000000000000000";

    beforeEach(() => {
      returnJson = formatRowOne(rowOneString);
    });

    it("should format the string correctly", () => {
      expect(returnJson.rowOneData.eightBitsLowPktCntr).toEqual("11100010");
      expect(returnJson.rowOneData.alert).toEqual("1110");
      expect(returnJson.rowOneData.alertBits).toEqual("0000");
      expect(returnJson.rowOneData.placeHold).toEqual("0000");
      expect(returnJson.rowOneData.zero).toEqual("0000");
      expect(returnJson.rowOneData.zeros).toEqual("00000000");
    });
  });

  describe("Row two formatter", () => {
    let returnJson: { rowTwoData: any };
    const rowTwoString = "00001011010101011001111000000000";

    beforeEach(() => {
      returnJson = formatRowTwo(rowTwoString);
    });
    it("Should format the string correctly", () => {
      expect(
        returnJson.rowTwoData.twentyfourHighBitsofFourtyfourBitTimestamp
      ).toEqual("000010110101010110011110");
      expect(returnJson.rowTwoData.zeros).toEqual("00000000");
    });
  });

  describe("Row three formatter", () => {
    let returnJson: { rowThreeData: any };
    const rowThreeString = "01101011010001101100000000000000";

    beforeEach(() => {
      returnJson = formatRowThree(rowThreeString);
    });
    it("Should format the string correctly", () => {
      expect(
        returnJson.rowThreeData.twentyLowBitsofFourtyfourBitTimestamp
      ).toEqual("01101011010001101100");
      expect(returnJson.rowThreeData.fineRez).toEqual("0000");
      expect(returnJson.rowThreeData.zeros).toEqual("00000000");
    });
  });

  describe("Row four formatter", () => {
    let returnJson: { rowFourData: any };
    const rowFourString = "00000000000001010010100000000000";

    beforeEach(() => {
      returnJson = formatRowFour(rowFourString);
    });
    it("Should format a string correctly", () => {
      expect(
        returnJson.rowFourData.twentyfourBitsofNormalMessageReplyTime
      ).toEqual("000000000000010100101000");
      expect(returnJson.rowFourData.zeros).toEqual("00000000");
    });
  });

  describe("row five formatter", () => {
    let returnJson: { rowFiveData: any };
    const rowFiveString = "11111111111111111111111100000000";

    beforeEach(() => {
      returnJson = formatRowFive(rowFiveString);
    });
    it("Should format a string correctly", () => {
      expect(returnJson.rowFiveData.twentyfourBitsofRTReplyTime).toEqual(
        "111111111111111111111111"
      );
      expect(returnJson.rowFiveData.zeros).toEqual("00000000");
    });
  });

  describe("Row six formatter", () => {
    let returnJson: { rowSixData: any };
    const rowSixString = "11111111111111111111000000000000";

    beforeEach(() => {
      returnJson = formatRowSix(rowSixString);
    });
    it("Should format a string correctly", () => {
      expect(returnJson.rowSixData.sync).toEqual("111");
      expect(
        returnJson.rowSixData.decodedCommandMessagedSeventeenBitsRt2Rt
      ).toEqual("11111111111111111");
      expect(returnJson.rowSixData.zeros).toEqual("000000000000");
    });
  });

  describe("Row seven formatter", () => {
    let returnJson: { rowSevenData: any };
    const rowSevenString = "01000011111111000010000000000000";

    beforeEach(() => {
      returnJson = formatRowSeven(rowSevenString);
    });
    it("Should format a string correctly", () => {
      expect(returnJson.rowSevenData.sync).toEqual("010");
      expect(
        returnJson.rowSevenData.decodedCommandMessagedSeventeenBits
      ).toEqual("00011111111000010");
      expect(returnJson.rowSevenData.zeros).toEqual("000000000000");
    });
  });

  describe("Row eight formatter", () => {
    let returnJson: { rowEightData: any };
    const rowEightString = "11111111111111111111111100000000";

    beforeEach(() => {
      returnJson = formatRowEight(rowEightString);
    });
    it("Should format a string correctly", () => {
      expect(returnJson.rowEightData.sync).toEqual("111");
      expect(
        returnJson.rowEightData.decodedStatusMessagedSeventeenBitsRt2Rt
      ).toEqual("11111111111111111");
      expect(returnJson.rowEightData.zeros).toEqual("111100000000");
    });
  });

  describe("Row nine formatter", () => {
    let returnJson: { rowNineData: any };
    const rowNineString = "01000011000000000001000000000000";

    beforeEach(() => {
      returnJson = formatRowNine(rowNineString);
    });
    it("Should format a string correctly", () => {
      expect(returnJson.rowNineData.sync).toEqual("010");
      expect(
        returnJson.rowNineData.decodedStatusMessagedSeventeenBits
      ).toEqual("00011000000000001");
      expect(returnJson.rowNineData.zeros).toEqual("000000000000");
    });
  });

});
