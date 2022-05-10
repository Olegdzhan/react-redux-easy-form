export const deepEqual = (source: any, compareData: any): boolean => {
  if (!source || !compareData) {
    return source === compareData;
  }

  if (typeof source !== 'object' || typeof compareData !== 'object') {
    return source === compareData;
  }

  if (Array.isArray(source) && Array.isArray(compareData)) {
    if (source.length !== compareData.length) {
      return false;
    }
    return source.every((el: any, i: number): boolean => deepEqual(el, compareData[i]));
  }

  if (
    typeof source === 'object' && !Array.isArray(source) &&
    typeof compareData === 'object' && !Array.isArray(compareData)
  ) {
    const sourceKeys = Object.keys(source);
    const compareDataKeys  = Object.keys(compareData);
    if (sourceKeys.length !== compareDataKeys.length) {
      return false;
    }
    if (!sourceKeys.every((key: string): boolean => compareDataKeys.includes(key))) {
      return false;
    }

    return sourceKeys.every((key: string): boolean => deepEqual(source[key], compareData[key]));
  }

  return false;
};
