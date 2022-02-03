export const sliceIntoNChunks = <T>(arr: T[], numberOfChunks: number = 8): T[][] => {
    const arrayOfArrays = [];
    const chunkSize = arr.length / numberOfChunks;
    if (arr.length % numberOfChunks !== 0)
      throw new Error(
        `Array is not evenly divisible into ${numberOfChunks} arrays`
      );
    for (let index = 0; index < arr.length; index += chunkSize) {
      const chunk = arr.slice(index, index + chunkSize);
      arrayOfArrays.push(chunk);
    }
    return arrayOfArrays;
  };
  
  export const sliceIntoNSizeChunks = <T>(arr: T[], chunkSize = 32): T[][] => {
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, chunkSize));
    return newArr;
  };
  