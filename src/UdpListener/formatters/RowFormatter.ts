export const formatRowZero = (rowData: string) => {
  const formattedData = {
    busLetter: rowData.substring(0, 4),
    oxNine: rowData.substring(4, 8),
    oxZero: rowData.substring(8, 12),
    otherOxNine: rowData.substring(12, 16),
    eightBitsHighPktCntr: rowData.substring(16, 24),
    zeros: rowData.substring(24, 32),
  };
  return { rowZeroData: formattedData };
};

export const formatRowOne = (rowData: string) => {
  const formattedData = {
    eightBitsLowPktCntr: rowData.substring(0, 8),
    alert: rowData.substring(8, 12),
    alertBits: rowData.substring(12, 16),
    placeHold: rowData.substring(16, 20),
    zero: rowData.substring(20, 24),
    zeros: rowData.substring(24, 32),
  };
  return { rowOneData: formattedData };
};

export const formatRowTwo = (rowData: string) => {
  const formattedData = {
    twentyfourHighBitsofFourtyfourBitTimestamp: rowData.substring(0, 24),
    zeros: rowData.substring(24, 32),
  };
  return { rowTwoData: formattedData };
};

export const formatRowThree = (rowData: string) => {
  const formattedData = {
    twentyLowBitsofFourtyfourBitTimestamp: rowData.substring(0, 20),
    fineRez: rowData.substring(20, 24),
    zeros: rowData.substring(24, 32),
  };
  return { rowThreeData: formattedData };
};

export const formatRowFour = (rowData: string) => {
  const formattedData = {
    twentyfourBitsofNormalMessageReplyTime: rowData.substring(0, 24),
    zeros: rowData.substring(24, 32),
  };
  return { rowFourData: formattedData };
};

export const formatRowFive = (rowData: string) => {
  const formattedData = {
    twentyfourBitsofRTReplyTime: rowData.substring(0, 24),
    zeros: rowData.substring(24, 32),
  };
  return { rowFiveData: formattedData };
};

export const formatRowSix = (rowData: string) => {
  const formattedData = {
    sync: rowData.substring(0, 3),
    decodedCommandMessagedSeventeenBitsRt2Rt: rowData.substring(3, 20),
    zeros: rowData.substring(20, 32),
  };
  return { rowSixData: formattedData };
};

export const formatRowSeven = (rowData: string) => {
  const formattedData = {
    sync: rowData.substring(0, 3),
    decodedCommandMessagedSeventeenBits: rowData.substring(3, 20),
    zeros: rowData.substring(20, 32),
  };
  return { rowSevenData: formattedData };
};

export const formatRowEight = (rowData: string) => {
  const formattedData = {
    sync: rowData.substring(0, 3),
    decodedStatusMessagedSeventeenBitsRt2Rt: rowData.substring(3, 20),
    zeros: rowData.substring(20, 32),
  };
  return { rowEightData: formattedData };
};
export const formatRowNine = (rowData: string) => {
  const formattedData = {
    sync: rowData.substring(0, 3),
    decodedStatusMessagedSeventeenBits: rowData.substring(3, 20),
    zeros: rowData.substring(20, 32),
  };
  return { rowNineData: formattedData };
};
export const formatDecodedDataRow = (rowData: string, i: number) => {
    const formattedData = {
      sync: rowData.substring(0, 3),
      decodedData: rowData.substring(3, 20),
      zeros: rowData.substring(20, 32),
    };
    const retObject = {};
    const propertyName = `row${i}DecodedData`;
    // @ts-ignore
    retObject[propertyName] = formattedData;
    return retObject;
  };
  
  export const formatRowReserved = (rowData: string, i: number) => {
    const formattedData = {
      reserved: rowData.substring(0, 20),
      zeros: rowData.substring(20, 32),
    };
    const retObject = {};
    const propertyName = `row${i}ReservedData`;
    // @ts-ignore
    retObject[propertyName] = formattedData;
    return retObject;};
