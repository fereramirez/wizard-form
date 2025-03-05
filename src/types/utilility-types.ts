/* eslint-disable @typescript-eslint/no-explicit-any */
export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I,
) => void
  ? I
  : never;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
