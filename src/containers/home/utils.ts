export const scaleRange = (
  unscaledNum: number,
  domain: [number, number],
  range: [number, number]
) => {
  const [min, max] = domain;
  const [minAllowed, maxAllowed] = range;
  return ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed;
};
