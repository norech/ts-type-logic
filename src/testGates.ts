import { And, Equals, Or } from "./gates";

declare function assert<T extends true>(v: T): T;
declare function isTrue<T extends boolean>(v: T): Equals<T, true>;
declare function isFalse<T extends boolean>(v: T): Equals<T, false>;

declare function and<T extends boolean, U extends boolean>(t: T, u: U):
    And<T, U>;
declare function or<T extends boolean, U extends boolean>(t: T, u: U):
    Or<T, U>;

assert(isTrue(and(true, true))); // => ok
// assert(isFalse(and(true, true))); // => error

assert(isTrue(or(true, false))); // => ok
assert(isFalse(or(false, false))); // => ok
// assert(isTrue(or(false, false))); // => error
