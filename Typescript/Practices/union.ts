// Definition of UNION in TypeScript : a union type describes a value that can be one of several types.

let Score:number | string = 33;

Score = 44;

Score = "44";

// A type USER
type user = {
    name: string;
    _id: number;
}

// A type ADMIN
type admin = {
    userName: string;
    _id: number;
}


// This is the example of UNION type
let Hitesh: user | admin = {
    name: "Hitesh",
    _id: 123,
}

Hitesh = {
    userName: "Hitesh",
    _id: 123,
}

function printId(id: user | admin) {
    console.log(id._id);
}

printId(Hitesh);

function getDBID(id: number | string){
    id.toLowerCase(); // Error: Property 'toLowerCase' does not exist on type 'string | number'. It is not possible to use string methods on number type.
}


// This function is used to check the type of the variable and then perform the operation on it.
function getDBID2(id: number | string){
    if(typeof id === "string"){
        id.toLowerCase(); // OK
    }else{
        id.toFixed(); // OK
    }
}

//Array of UNION type

const data: number [] = [1,2,3,"5"]; // Error: Type 'string' is not assignable to type 'number'.Means we can not assign string to number type.

const data2: string [] = [1,2,3,"5"]; // Error: Type 'number' is not assignable to type 'string'.Means we can not assign number to string type. 

const data3: (number | string | boolean) [] = [1,2,3,"5", true]; // OK, because we have defined the array of UNION type. It is possible to assign number, string and boolean type to the array.



//Object of UNION type

const data4: {name: string, id: number} | string = {
    name: "Hitesh",
    id: 123,
}


// Function of UNION type

function printId2(id: user | admin) {
    console.log(id._id);
}

// Strict Number

let pi:3.14 = 3.14; // OK
pi= 3; // Error: Type '3' is not assignable to type '3.14'.because we have defined the strict number type.


let seatAllotment: "aisle" | "middle" | "window" = "aisle"; // OK
seatAllotment = "middle"; // OK
seatAllotment = "window"; // OK
seatAllotment = "crew"; // Error: Type '"crew"' is not assignable to type '"aisle" | "middle" | "window"'.because we have defined the strict string type.