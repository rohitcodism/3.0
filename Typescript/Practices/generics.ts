// Generics in Typescript
// Generics are used to create reusable components

// Example 1: Simple Generic
const score:Array<number> = []; // Array of numbers

// Example 2: Generic with string
const names: Array<string> = []; // Array of strings

// Example 3: function but we can't use so much union types
function IdentityOne(val : boolean | number): boolean | number {
    return val;
}

// Example 4: A function but there is implicit any type
function IdentityTwo(val : any): any {
    return val;
}

// Example 5: A function with generic type, which is better than above two, because it is more flexible and reusable
function IdentityThree<Type>(val: Type): Type{
    return val;
}

// Application of generic function above

// A generic function can be called with different types of arguments here we are calling with number type
IdentityThree(3);

// A generic function can be called with different types of arguments here we are calling with string type
IdentityThree("Hello");

// A generic function can be called with different types of arguments here we are calling with boolean type
IdentityThree(true);


// Example 6: Generic with Function Types but modern syntax
function IdentityFour<T>(val: T): T {
    return val;
}

interface Bottle {
    brand: string;
    size: number;
}

IdentityFour<Bottle>({brand: "Milton", size: 4}); // Bottle type