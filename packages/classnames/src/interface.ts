export type Non<T, U> = T extends U ? never : T;

export type Value = string | number | boolean | undefined | null;

export type Mapping = Record<string, unknown>;

export type Argument = Value | Mapping | Argument[];
