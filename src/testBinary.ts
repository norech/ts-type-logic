import { RotateOneLeft, RotateOneRight, ShiftOneLeft, ShiftOneRight } from "./binary";
import { ByteToUnsignedNumber, UnsignedNumberToByte } from "./tables/numbers";

declare function assertMatch<T, U extends T>(): T extends U ? void : never;

// convert the numbers to binary representations using a table
type Eight = UnsignedNumberToByte<8>;
type Sixteen = UnsignedNumberToByte<16>;
type Ten = UnsignedNumberToByte<10>;
type Twenty = UnsignedNumberToByte<20>;
type SixtyOne = UnsignedNumberToByte<61>;
type OneHundredAndFiftyEight = UnsignedNumberToByte<158>;

// and then we can use them in our operations
assertMatch<ShiftOneLeft<Eight>, Sixteen>(); // => ok
assertMatch<ShiftOneRight<Sixteen>, Eight>(); // => ok
// assertMatch<ShiftOneLeft<Eight>, Twenty>(); // => error
// assertMatch<ShiftOneRight<Sixteen>, SixtyOne>(); // => error

assertMatch<ShiftOneLeft<Ten>, Twenty>(); // => ok
assertMatch<ShiftOneRight<Twenty>, Ten>(); // => ok
// assertMatch<ShiftOneLeft<Ten>, SixtyOne>(); // => error
// assertMatch<ShiftOneRight<Twenty>, Eight>(); // => error

assertMatch<RotateOneRight<FortyTwo>, OneHundredAndFiftyEight>(); // => ok
assertMatch<RotateOneLeft<OneHundredAndFiftyEight>, SixtyOne>(); // => ok
