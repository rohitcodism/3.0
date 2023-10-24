const user1: (string | number | boolean) [] = ["HC", 1,  true];

const user2:[string | number, number, boolean] = ["HC", 1,  true]; // OK, It is called tuple. It is possible to assign string, number and boolean type to the array but with the specific order.

let RGB: [number , number , number] = [255, 255, 255]; // OK, It is called tuple. It is possible to assign number type to the array but with the specific order.

type USER = [number, string, boolean];

let user3: USER = [1, "HC", true]; // OK, It is called tuple. It is possible to assign number, string and boolean type to the array but with the specific order.

let errorUser: USER = ["HC", 1, true]; // Error: Type 'string' is not assignable to type 'number'.Means we can not assign string to number type.As we have defined the order of the tuple.

errorUser[0] = ""; // Error, because we have defined the order of the tuple. There is no string type in the first position of the tuple.

errorUser.push("hc") // But we can manually push the string type to the tuple.**It is not recommended**.



/* NOTE :
    Tuple types are a type of array of known length and where the different elements may have different types. A value of type [number, string] is guaranteed to have a length of 2, with a number at element 0 and a string at element 1.
*/