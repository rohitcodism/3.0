function addTwo(num : number): number{
    return num+2;
}

function getUpper(val: string){
    return val.toUpperCase();
}

function signUpUser(name: string, email: string, password: any){}

const loginUser = (name: string, email: string, isPaid: boolean = false) => {}

//multiple type value return
function getStatus(myVal : number){
    if(myVal>5)
        return false;
    else
        return "STATUS 200 OK!!"
}

// process of setting the return type in an arrow function
const getHello = (s: string):string => {
    return "hello"
}

const heros = ["thor", "spiderman", "ironman"]
// const heros = [1,2,3]

// typescript can automatically detect the type of the incoming elements or values, CONTEXT SWITCHING OF TYPESCRIPT
// should set the return of a map function, GOOD PRACTICE
heros.map((hero): string =>{
    return `Hero is ${hero}`;
})

// if a function is not returning anything its return type should be set as void
const consoleError = (errMessage: string): void => {
    console.error(errMessage)
}

const handleError = (errMessage: string): void => {
    throw new Error(errMessage);
}

addTwo(5);
getUpper("rohit")
signUpUser('rohit', "rohitpaul.com", "anyrpgo")
loginUser("rp", "dkldgsfh")

export{};