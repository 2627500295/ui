import { isString, isNumber } from "@minicdn/toolkit";

const hasOwn = {}.hasOwnProperty;

export type Value = string | number | boolean | undefined | null;

export type Mapping = Record<string, unknown>;

export type Argument = Value | Mapping | Argument[];

export function classNames(...params: Argument[]): string {
  const classes: (string | number)[] = [];

  for (let i = 0; i < params.length; i++) {
    const arg = params[i];

    if (!arg) continue;

    if (isString(arg) || isNumber(arg)) {
      classes.push(arg);
    }

    //
    else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = classNames(...arg);

        if (inner) {
          classes.push(inner);
        }
      }
    }

    //
    else if (typeof arg === "object") {
      if (arg.toString === Object.prototype.toString) {
        for (const key in arg as Mapping) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(" ");
}

export default classNames;
