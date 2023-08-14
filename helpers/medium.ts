export const getMediumValue = (arr: number[]) => {
  const sorted = arr.sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[half]
    : (sorted[half - 1] + sorted[half]) / 2;
};
