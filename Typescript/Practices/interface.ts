// Objective: Demonstrate the use of interfaces in typescript

// Interfaces are used to define the structure of an object
// Interfaces are not compiled to javascript
// Interfaces are used to define types

// Example 1: Defining an interface
interface User {
    readonly _DBid: number; // Readonly property
    email: string;
    userID: number;
    googleID?: string; // Optional property
    startTrial: () =>string; // Function property method 1
    startSubscription ?(): string; // Function property method 2, optional
    getCoupon(couponCode : string): boolean; // Function property, takes a string and returns a boolean
}

//We can add properties to an interface later
//We can't do this with a type
interface User {
    githubID?: string; // Optional property, can be added later

}

// Inheritance of interfaces
interface specialUser extends User {
    specialID: string;
} // We can extend an interface

// Example 2: Defining a type
type user = {
    email: string;
    userID: number;
}

// Example 3: Using an interface
const user1: User = {
    _DBid: 1543780935,
    email: "rohit@.com",
    userID: 1,
    startTrial: () => "Trial started", // Function property, returns a string
    startSubscription: () => {return "Subscription started"}, // Function property, returns a string, method 2, optional so no error , it can be undefined
    getCoupon: (couponCode: "sjk42309243@fds") => {return true},  // Function property, takes a string and returns a boolean
    githubID: "rohit" // Optional property, no error, can be added later
}

// Example 4: Interface extending another interface
const user2: specialUser = {
    specialID: "123",
    _DBid: 1543780935,
    email: "rohit@.com",
    userID: 1,
    startTrial: () => "Trial started", // Function property, returns a string
    startSubscription: () => {return "Subscription started"}, // Function property, returns a string, method 2, optional so no error , it can be undefined
    getCoupon: (couponCode: "sjk42309243@fds") => {return true},  // Function property, takes a string and returns a boolean
}


user1._DBid = 123; // Error: Cannot assign to '_DBid' because it is a read-only property.
user1.email = "rohit@coolmail.com" // No error, because email is not readonly.


// Type v/s Interface

// Type is used to define a type
// Interface is used to define a structure

// Type can be used to define a union type
// Interface cannot be used to define a union type

// Type can be used to define a tuple type
// Interface cannot be used to define a tuple type

// Type can be used to define an intersection type
// Interface cannot be used to define an intersection type

// Type can be used to define an alias
// Interface cannot be used to define an alias

// Type can be used to define a primitive type
// Interface cannot be used to define a primitive type

// Type can be used to define a function type
// Interface cannot be used to define a function type


