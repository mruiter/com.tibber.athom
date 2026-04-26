import moment from 'moment-timezone';

export const isSomeString = (value: unknown): boolean =>
  typeof value === 'string' && value.trim().length > 0;

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export const parseTimeString = (time: TimeString): moment.Moment => {
  const [h, m] = time.split(':');
  return moment
    .tz('Europe/Oslo')
    .hour(Number(h))
    .minute(Number(m))
    .startOf('minute');
};

export const startOfQuarterHour = (value: moment.Moment): moment.Moment =>
  value
    .clone()
    .second(0)
    .millisecond(0)
    .minute(Math.floor(value.minute() / 15) * 15);

// takes from end of array if `quantity` is negative
export const takeFromStartOrEnd = <T>(arr: T[], quantity?: number): T[] => {
  if (quantity === undefined) return [];

  let startIndex;
  let endIndex;
  if (Math.sign(quantity) === -1) {
    startIndex = quantity;
    endIndex = undefined;
  } else {
    startIndex = 0;
    endIndex = quantity;
  }
  return arr.slice(startIndex, endIndex);
};

export const mean = <T>(arr: readonly T[], func: (item: T) => number): number =>
  sum(arr, func) / arr.length;

export const sum = <T>(
  arr: readonly T[],
  func: (item: T) => number,
): number => {
  let result = 0;
  for (const item of arr) result += func(item);
  return result;
};

export const min = <T>(arr: readonly T[], predicate: (item: T) => number) => {
  if (arr.length === 0) return undefined;

  let minimum = arr[0];
  let minimumValue = predicate(minimum);

  for (let i = 1; i < arr.length; i += 1) {
    const value = predicate(arr[i]);
    if (value < minimumValue) {
      minimum = arr[i];
      minimumValue = value;
    }
  }

  return minimum;
};

export const max = <T>(arr: readonly T[], predicate: (item: T) => number) => {
  if (arr.length === 0) return undefined;

  let maximum = arr[0];
  let maximumValue = predicate(maximum);

  for (let i = 1; i < arr.length; i += 1) {
    const value = predicate(arr[i]);
    if (value > maximumValue) {
      maximum = arr[i];
      maximumValue = value;
    }
  }

  return maximum;
};

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TimeString = `${Digit}${Digit}:${Digit}${Digit}`;

export const randomBetweenRange = (
  lowerLimit: number,
  upperLimitExclusive: number,
) =>
  Math.floor(Math.random() * (upperLimitExclusive - lowerLimit) + lowerLimit);
