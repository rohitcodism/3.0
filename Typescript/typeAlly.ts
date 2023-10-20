//by this actually we are creating a custom data type name User, this process is called Type Aliases
type User = {
    name:string,
    email:string,
    isActive:boolean,
}

const createUser = (user: User): User => {
    return {name: "", email :"", isActive : true};
}

createUser({name: "", email: "", isActive :true})