export const hasAnyItemInCommon = (arr1: (string | number)[], arr2: (string | number)[]) => {
  return arr1.some((item) => arr2.indexOf(item) !== -1);
};
