type User = {
    readonly _id: string; //obviously as per the name, this property is read only, it can't be changed
    name: string;
    email: string;
    active: boolean;
    Card ?: number; //optional property, user can have a card or not so it's optional so that we don't have to pass it every time
}

let U: User = {
    _id: '123',
    name: 'John',
    email: 'rp@active.com',
    active: true,
}

U.email = "rp@COD.com";
// U._id = "456"; //error, can't change the value of _id


// MIX AND MATCH OF TYPES


type cardNumber = {
    cardNumber: number;
}

type cardHolder = {
    cardHolder: string;
}

type cardValid = {
    cardValid: boolean;
}

type  cardDetails = cardNumber & cardHolder & cardValid; //mixing and matching of types

const card1: cardDetails = {
    cardNumber: 123,
    cardHolder: 'John',
    cardValid: true,
}

type cardEverything = cardDetails & {
    CVV: number;
}

let card2: cardEverything = {
    cardNumber: 456,
    cardHolder: 'John',
    cardValid: true,
    CVV: 123,
}
