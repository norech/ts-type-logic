import { Byte } from "./binary";
import { ByteToAsciiChar } from "./tables/ascii";

export type Concat<T extends string[]>
    = T extends [infer A, ...infer B]
    ? A extends string
    ? B extends string[]
        ? `${A}${Concat<B>}`
        : T extends [infer A] ? A : ""
    : ""
    : "";

export type BytesToString<T extends Byte[]>
    = T extends [infer A, ...infer B]
    ? A extends Byte
    ? B extends Byte[]
        ? `${ByteToAsciiChar<A>}${BytesToString<B>}`
        : T extends [infer A] ? A extends Byte ? ByteToAsciiChar<A> : "" : ""
    : ""
    : "";