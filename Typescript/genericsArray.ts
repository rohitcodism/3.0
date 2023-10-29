// Generics Array

// Normal function using generics array
function getSearchProducts<T>(products: T[]): T {
    // do something
    const myIndex =  0;
    const listLength = products.length;
    return products[myIndex];
}
 // Arrow function using generics array
// The comma after <T> ==> <T,> is required to avoid confusion with JSX element.
const myFavorites = <T,>():T =>{
    // do something
    // call getSearchProducts function
    return getSearchProducts<T>([]);
}