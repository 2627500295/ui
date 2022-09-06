/**
 * pickBy
 *
 * @param {object} obj - 对象
 * @param {array} props - 要取那些属性
 * @param {function} predicate - 回调
 * @returns {object}
 */
export function pickBy<T extends {}, K extends keyof T>(
  obj: T,
  props: K[],
  predicate: (value: unknown, key: K) => boolean
): Pick<T, K> {
  return props.reduce<Pick<T, K>>((acc, key) => {
    predicate(obj[key], key) && (acc[key] = obj[key]);
    return acc;
  }, {} as Pick<T, K>);
}

/**
 * pick
 *
 * @param {*} obj - 对象
 * @param {*} props - 要取那些属性
 */
export function pick<T extends {}, K extends keyof T>(obj: T, props: K[]) {
  return pickBy(obj, props, (value, key) => key in obj);
}
