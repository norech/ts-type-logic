# TS Type Logic

Computing logic and basic maths made by (ab)using the TypeScript type system (meta-programming).

Each file is located in `src/`. All files whose name start by `test` are a collection of assertions and examples related to the file of the same name.

For example, the file `src/testNumeric.ts` is a collection of assertions and examples related to the file `src/numeric.ts`.

Since we can't really use numbers directly, each number is represented as an array of 8 booleans, representing a byte, written using the tuple representation.

- `UnsignedNumberToByte<N>` converts a number `N` (between 0 and 255) to an array representing a byte, thanks to a lookup table.
- `ByteToUnsignedNumber<B>` converts back an array representing a byte to a number, thanks to another lookup table.

## A few examples

### Converting a number to a byte and back

```typescript
type B1 = UnsignedNumberToByte<42>; // [false, false, true, false, true, false, true, false]
type B2 = UnsignedNumberToByte<255>; // [true, true, true, true, true, true, true, true]

type N1 = ByteToUnsignedNumber<B1>; // 42
type N2 = ByteToUnsignedNumber<B2>; // 255
```

### Add two numbers

```ts
// example of adding two numbers
// 12 + 25 = 37
type A = UnsignedNumberToByte<12>;
type B = UnsignedNumberToByte<25>;

type R = Add<A, B>; // [false, false, true, false, false, true, false, true]
type N = ByteToUnsignedNumber<R>; // 37
```

### Bitshift left

```ts
// example of bitshift left
// 10 << 1 = 20
type Ten = UnsignedNumberToByte<10>;
type Twenty = UnsignedNumberToByte<20>;

assertMatch<ShiftOneLeft<Ten>, Twenty>();
```
