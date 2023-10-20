const User = {
    name : "rohit",
    email: "rohitpaul3040330@gmail.com",
    isActive: true,
}

const createUser = ({name: string, isActive: boolean}) => {}

// new user has three properties but our create user function has a object with two properties
let newUser = {name: "rohit", email: "rohit@rohit@gmail.com", isActive: true}

// by creating a new object we can pass more arguments than the actual function
// it is a bad behavior
createUser(newUser);

const createCourse = ():{name:string, isPaid:boolean} => {
    return{name: "react", isPaid: false};
}; 
export{};