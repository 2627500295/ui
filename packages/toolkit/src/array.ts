const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * 取数组第一位
 * @param arr - 数组
 */
export function head<T>(arr: T[]) {
  return Array.isArray(arr) && arr.length ? arr[0] : undefined;
}

/**
 * 取数组最后一位
 * @param arr - 数组
 */
export function last<T>(arr: T[]) {
  return Array.isArray(arr) && arr.length ? arr[arr.length - 1] : undefined;
}

/**
 * 取数组指定index的值
 *
 * @param arr - 数组
 * @param n - 下标
 *
 * @returns {*}
 */
export function nth<T>(arr: T[], n: number): T | undefined {
  if (
    Array.isArray(arr) &&
    arr.length &&
    n >= 0 &&
    n < MAX_SAFE_INTEGER &&
    arr.length > n
  ) {
    return arr[n];
  }

  return undefined;
}

/**
 * 取数组指定index的值
 *
 * @param arr - 数组
 * @param n - 下标
 *
 * @returns {*}
 */
export function at<T>(arr: T[], n: number): T | undefined {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0;

  // Allow negative indexing from the end
  if (n < 0) n += arr.length;

  // OOB access is guaranteed to return undefined
  if (n < 0 || n >= arr.length) return undefined;

  // Otherwise, this is just normal property access
  return arr[n];
}
