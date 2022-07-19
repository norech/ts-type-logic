export type And<T extends boolean, U extends boolean>
    = T extends true
        ? U extends true
            ? true
            : false 
        : false

export type Or<T extends boolean, U extends boolean>
    = T extends true ? true
        : U extends true ? true
        : false;

export type Xor<T extends boolean, U extends boolean>
    = T extends true
        ? U extends true ? false : true
        : U extends true ? true : false;

export type Not<T extends boolean>
    = T extends true ? false : true;

export type If<T extends boolean, U, V> = T extends true ? U : V;

export type Equals<T extends boolean, U extends boolean>
    = T extends U ? U extends T ? true : false : false;
