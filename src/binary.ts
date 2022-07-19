import { Increment, IsSuperiorOrEq } from "./numeric";

export type AsBool<T> = T extends boolean ? T : never;

export type Byte = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

export type ShiftOneLeft<T extends Byte>
    = T extends [boolean, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? [B, C, D, E, F, G, H, false]
    : never;

export type ShiftOneRight<T extends Byte>
    = T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, boolean]
    ? [false, A, B, C, D, E, F, G]
    : never;

export type RotateOneLeft<T extends Byte>
    = T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? [B, C, D, E, F, G, H, A]
    : never;

export type RotateOneRight<T extends Byte>
    = T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? [H, A, B, C, D, E, F, G]
    : never;

export type AsUnconstrainedByte<T> = T extends boolean[] ? T : never;

export type UnconstrainedByteLength<T extends boolean[]>
    = T extends [boolean, ...infer N]
        ? Increment<UnconstrainedByteLength<AsUnconstrainedByte<N>>>
        : [false, false, false, false, false, false, false, false];

export type GetLongestByte<T extends boolean[], U extends boolean[]>
    = IsSuperiorOrEq<UnconstrainedByteLength<T>, UnconstrainedByteLength<U>> extends true ? T : U;


export type UnconstrainedShiftOneRight<T extends boolean[]>
    = T extends [...infer N, boolean]
    ? [false, ...AsUnconstrainedByte<N>]
    : never;
