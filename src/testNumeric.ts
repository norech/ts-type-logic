import { Byte } from "./binary";
import { Add, AreEq, Decrement, Increment, IsNonZero, IsSuperiorOrEq } from "./numeric";
import { ByteToUnsignedNumber, UnsignedNumberToByte } from "./tables/numbers";

declare function assert<T extends true>(v: T): T;
declare function assertMatch<T, U extends T>(): T extends U ? void : never;
declare function areEq<T extends Byte, U extends Byte>(): AreEq<T, U>;
declare function superiorOrEq<T extends Byte, U extends Byte>(): IsSuperiorOrEq<T, U>;
declare function isNonZero<T extends Byte>(): IsNonZero<T>;

// convert the numbers to binary representations using a table
type Zero = UnsignedNumberToByte<0>;
type One = UnsignedNumberToByte<1>;
type Eight = UnsignedNumberToByte<8>;
type Nine = UnsignedNumberToByte<9>;
type Sixteen = UnsignedNumberToByte<16>;
type OneHundredAndFiftyEight = UnsignedNumberToByte<158>;

// and then we can use them in our operations
assert(superiorOrEq<Sixteen, Zero>()); // => ok
assert(superiorOrEq<Sixteen, Eight>()); // => ok

// and then we can use them in our operations
assert(superiorOrEq<Sixteen, Eight>()); // => ok
// assert(superiorOrEq<Eight, Sixteen>()); // => error
assert(superiorOrEq<OneHundredAndFiftyEight, Eight>()); // => ok
// assert(superiorOrEq<Eight, OneHundredAndFiftyEight>()); // => error

// assert(areEq<OneHundredAndFiftyEight, Eight>()); // => error
assert(areEq<Eight, Eight>()); // => ok

assertMatch<Increment<Eight>, Nine>(); // => ok
assertMatch<Decrement<Nine>, Eight>(); // => ok
// assertMatch<Increment<Eight>, OneHundredAndFiftyEight>(); // => error
// assertMatch<Decrement<Nine>, OneHundredAndFiftyEight>(); // => error

assert(isNonZero<Eight>()); // => ok
assert(isNonZero<OneHundredAndFiftyEight>()); // => ok
// assert(isNonZero<Zero>()); // => error

assertMatch<Add<Eight, Eight>, Sixteen>(); // => ok
assertMatch<Add<Eight, One>, Nine>(); // => ok
assertMatch<Add<Eight, Eight>, Sixteen>(); // => ok

assertMatch<ByteToUnsignedNumber<Add<Nine, One>>, 10>(); // => ok
assertMatch<ByteToUnsignedNumber<Add<OneHundredAndFiftyEight, Nine>>, 167>(); // => ok

// example of adding two numbers
// 12 + 25 = 37
type N1 = UnsignedNumberToByte<12>;
type N2 = UnsignedNumberToByte<25>;

type R = ByteToUnsignedNumber<Add<N1, N2>>
assertMatch<R, 37>();
