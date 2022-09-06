/**
 * 创建
 *
 * @param methodName - 方法名称
 *
 * @returns
 */
function createCaseFirst<K extends FilterKeys<String, () => any>>(
  methodName: K
) {
  return function (str: string) {
    const chr = str.charAt(0);
    const trailing = str.slice(1);
    return chr[methodName]() + trailing;
  };
}

/**
 * 首字母大写
 *
 * @params str - 字符串
 *
 * @returns 字符串
 */
export const upperFirst = createCaseFirst("toUpperCase");

/**
 * 首字母小写
 *
 * @params str - 字符串
 *
 * @returns 字符串
 */
export const lowerFirst = createCaseFirst("toLowerCase");
