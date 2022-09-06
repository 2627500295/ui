import { isNumber, isString } from "@minicdn/toolkit";

import type { Non, Argument } from "./interface";

function toValue(mix: Non<Argument, null | undefined | false>): string {
  let k: number | string;
  let y: string;
  let str: string = "";

  // 字符串与文字
  if (isString(mix) || isNumber(mix)) {
    str += mix;
  }

  // 数组
  else if (Array.isArray(mix)) {
    for (k = 0; k < mix.length; k++) {
      let arg = mix[k];
      if (arg && (y = toValue(arg))) {
        str && (str += " ");
        str += y;
      }
    }
  }

  // 对象
  else if (typeof mix === "object") {
    for (k in mix) {
      if (mix[k]) {
        str && (str += " ");
        str += k;
      }
    }
  }

  return str;
}

export function classNames(...args: Argument[]) {
  let i: number = 0;
  let tmp: Argument;
  let x: string;
  let str: string = "";

  while (i < args.length) {
    tmp = args[i++];

    if (tmp && (x = toValue(tmp))) {
      str && (str += " ");
      str += x;
    }
  }

  return str;
}

export default classNames;
