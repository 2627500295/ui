/* eslint no-self-compare: "off" */
export function eq(value: any, other: any): boolean {
  return value === other || (value !== value && other !== other);
}

export const hasOwn = Object.prototype.hasOwnProperty;

/**
 * 获取类型
 *
 * @param params - 要检测的对象
 *
 * @returns - 类型
 *
 * @example
 *
 * type({});
 * // => "object"
 *
 * type(1);
 * // => "number"
 *
 * type(true);
 * // => "boolean"
 *
 * type('');
 * // => "string"
 *
 * type(null);
 * // => "null"
 *
 * type([]);
 * // => "array"
 *
 * type(() => {});
 * // => "function"
 *
 * type(undefined);
 * // => "undefined"
 *
 * type(document);
 * // => "htmldocument"
 *
 * type(/./);
 * // => "regexp"
 *
 * type(new Date());
 * // => "date"
 *
 * type(JSON);
 * // => "json"
 *
 * type(Math);
 * // => "math"
 */
export function type(params: any) {
  if (params === void 0) return "undefined";
  if (params === null) return "null";
  return Object.prototype.toString
    .call(params)
    .replace(/^\[object (\w*)]$/i, "$1")
    .toLowerCase();
}

/**
 * 类型检测
 *
 * @param str - 类型
 *
 * @returns 判断函数
 *
 * @example
 *
 * detect('string')('')
 * // => true
 *
 * detect('number')('')
 * // => false
 *
 * @private
 */
function detect<T>(str: string) {
  return function execute(val: any): val is T {
    return type(val) === str;
  };
}

/**
 * 判断是否数字
 *
 * @param val - 需要判断类型的值对象
 *
 * @returns 判断结果
 *
 * @example
 *
 * isNumber(0);
 * // => true
 */
export const isNumber = detect<number>("number");

/**
 * 判断是否字符串
 *
 * @param val - 需要判断类型的值对象
 *
 * @returns 判断结果
 *
 * @example
 *
 * isString("0");
 * // => true
 */
export const isString = detect<string>("string");

/**
 * 判断是否字符串
 *
 * @param val - 需要判断类型的值对象
 *
 * @returns 判断结果
 *
 * @example
 *
 * isString(true);
 * // => true
 */
export const isBoolean = detect<boolean>("boolean");

/**
 * 判断是否字符串
 *
 * @param val - 需要判断类型的值对象
 *
 * @returns 判断结果
 *
 * @example
 *
 * isArray([]);
 * // => true
 */
export const isArray = detect<any[]>("array");

/**
 * 判断是否 Promise
 *
 * @param obj - 需要检测的对象
 *
 * @returns 检测结果
 *
 * @example
 *
 * isPromise(Promise.resolve());
 * // => true
 *
 * isPromise({ then: function () {...} });
 * // => true
 *
 * isPromise(null);
 * // => false
 *
 * isPromise({});
 * // => false
 *
 * isPromise({ then: true })
 * // => false
 *
 */
export function isPromise(obj: any) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

/**
 * 是否对象
 */
export const isObject = detect<object>("object");

/**
 * 是否普通对象
 *
 * @param obj - 普通对象
 *
 * @returns
 *
 * @example
 *
 * isPlainObject({foo: 'bar'});
 * //=> true
 *
 * isPlainObject(new Object());
 * //=> true
 *
 * isPlainObject(Object.create(null));
 * //=> true
 *
 * // This works across realms
 * isPlainObject(runInNewContext('({})'));
 * //=> true
 *
 * isPlainObject([1, 2, 3]);
 * //=> false
 *
 * class Unicorn {}
 * isPlainObject(new Unicorn());
 * //=> false
 *
 * isPlainObject(Math);
 * //=> false
 */
export function isPlainObject(obj: any): obj is Record<PropertyKey, any> {
  if (!isObject(obj)) return false;
  if (!obj.constructor) return true;
  if (!isObject(obj.constructor.prototype)) return false;
  if (!obj.constructor.prototype.hasOwnProperty("isPrototypeOf")) return false;
  return true;
}
