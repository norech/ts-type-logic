import { AsBool, Byte, GetLongestByte, ShiftOneLeft, ShiftOneRight, UnconstrainedShiftOneRight } from "./binary";
import { And, Not, Or, Xor } from "./gates";
import { BytesToString, Concat } from "./string";
import { ByteToAsciiChar } from "./tables/ascii";
import { UnsignedNumberToByte, ByteToUnsignedNumber } from "./tables/numbers";

export type IsZero<T extends Byte>
    = AreEq<T, [false, false, false, false, false, false, false, false]>;

export type IsNonZero<T extends Byte>
    = Not<IsZero<T>>;

export type Increment<T extends Byte>
    = T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? H extends false
        ? [A, B, C, D, E, F, G, true]
        : G extends false
            ? [A, B, C, D, E, F, true, false]
            : Increment<ShiftOneRight<T>> extends [boolean, infer Ba, infer Ca, infer Da, infer Ea, infer Fa, infer Ga, infer Ha]
                ? [Ba, Ca, Da, Ea, Fa, Ga, Ha, false]
                : never
    : never;

export type Decrement<T extends Byte>
    = T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? H extends true
        ? [A, B, C, D, E, F, G, false]
        : G extends true
            ? [A, B, C, D, E, F, false, true]
            : Decrement<ShiftOneLeft<T>> extends [infer Aa, infer Ba, infer Ca, infer Da, infer Ea, infer Fa, infer Ga, boolean]
                ? [false, Aa, Ba, Ca, Da, Ea, Fa, Ga]
                : never
    : never;

type AddC<A extends boolean, B extends boolean, C extends boolean>
    = Or< And<Xor<A, B>, C>, And<A, B> >;

type AddR<A extends boolean, B extends boolean, C extends boolean>
    = Xor<Xor<A, B>, C>;

export type Add<T extends Byte, U extends Byte, C extends boolean = false>
    = And<IsZero<T>, IsZero<U>> extends true
        ? [false, false, false, false, false, false, false, C]
        : T extends [...boolean[], infer A]
            ? U extends [...boolean[], infer B]

                ? Add<
                    ShiftOneRight<T>, ShiftOneRight<U>, AddC<AsBool<A>, AsBool<B>, C>
                > extends [boolean, infer Bx, infer Cx, infer Dx, infer Ex, infer Fx, infer Gx, infer Hx]
                    ? [Bx, Cx, Dx, Ex, Fx, Gx, Hx, AddR<AsBool<A>, AsBool<B>, C>]
                    : never

                : never
            : never;

type AsUnconstrainedByte<T> = T extends boolean[] ? T : never;

export type UnconstrainedAdd<T extends boolean[], U extends boolean[], C extends boolean = false>
    = And<T extends false[] ? true : false, U extends false[] ? true : false> extends true
        ? GetLongestByte<T, U> extends [...infer N, boolean]
            ? [...AsUnconstrainedByte<N>, C]
            : never
        : T extends [...boolean[], infer A]
            ? U extends [...boolean[], infer B]

                ? UnconstrainedAdd<
                    UnconstrainedShiftOneRight<T>, UnconstrainedShiftOneRight<U>, AddC<AsBool<A>, AsBool<B>, C>
                > extends [boolean, ...infer Nx]
                    ? [...Nx, AddR<AsBool<A>, AsBool<B>, C>]
                    : never

                : never
            : never;
    
type n1 = UnsignedNumberToByte<42>;
type n2 = UnsignedNumberToByte<42>;
type res = Add<n1, n2>;
type value = ByteToUnsignedNumber<res>;

type e = UnconstrainedAdd<[false, true], [true, false, true]>;

export type AreEq<T extends Byte, U extends Byte>
    = T extends U ? true : false;

export type IsSuperiorOrEq<T extends Byte, U extends Byte>
    = T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? U extends [infer Aa, infer Ba, infer Ca, infer Da, infer Ea, infer Fa, infer Ga, infer Ha]
        ? A extends Aa
            ? B extends Ba
                ? C extends Ca
                    ? D extends Da
                        ? E extends Ea
                            ? F extends Fa
                                ? G extends Ga
                                    ? H extends Ha
                                        ? true
                                        : H
                                    : G
                                : F
                            : E
                        : D
                    : C
                : B
            : A
        : never
    : never;  

export type IsInferiorOrEq<T extends Byte, U extends Byte>
    = T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H]
    ? U extends [infer Aa, infer Ba, infer Ca, infer Da, infer Ea, infer Fa, infer Ga, infer Ha]
        ? A extends Aa
            ? B extends Ba
                ? C extends Ca
                    ? D extends Da
                        ? E extends Ea
                            ? F extends Fa
                                ? G extends Ga
                                    ? H extends Ha
                                        ? true
                                        : Ha
                                    : Ga
                                : Fa
                            : Ea
                        : Da
                    : Ca
                : Ba
            : Aa
        : never
    : never;
