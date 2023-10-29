// Generics class

// Example 1

// @param valOne: T
// @param valTwo: U
// @param numValue: V
// @return object
// 1. The function takes three parameters of type T, U and V
// 2. The function returns an object of type object
function anotherFunction<T, U, V extends DataBase>(valOne: T, valTwo:U, numValue: V):object{
    return {valOne, valTwo, numValue};
}

anotherFunction(true, 'string', {id: 1, username: 'string', password: 'string'});

// Example 2

interface DataBase {
    id: number;
    username: string;
    password: string;
}

// Example 3

interface Quiz {
    name: string;
    type: string;
}

interface Course {
    name: string;
    author: string;
    topic: string;
}

class sellAble<T>{
    public cart: T[] = []; // cart is an array of type T
    
    // @param item: T
    // @return void
    // 1. The function takes one parameter of type T
    // 2. The function returns void
    addToCard(item: T): void{
        this.cart.push(item);
    }
}