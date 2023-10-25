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
    getCoupon: (couponCode: "sjk42309243@fds") => {return true}  // Function property, takes a string and returns a boolean
}


user1._DBid = 123; // Error: Cannot assign to '_DBid' because it is a read-only property.
user1.email = "rohit@coolmail.com" // No error, because email is not readonly.
