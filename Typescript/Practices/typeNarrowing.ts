// Type Narrowing


function typeDetector(val: number | string){
    return val.toLowerCase(); // Error: Property 'toLowerCase' does not exist on type 'string | number'.
}


// Example  of type narrowing
function typeNarrowing(val: number | string){
    if(typeof val === 'string'){
        // val is of type string
        return val.toLowerCase();
    }
    // val is of type number
    return val + 3;
}

// Caution

function provideID(id: null | string){
    if(!id){
        console.log(`No ID was provided`);
        return;
    }

    else
        console.log(`Provided ID: ${id}`);
}

// Documentation Example

function printAll(strs: string | string[] | null) {
    // !!!!!!!!!!!!!!!!
    //  DON'T DO THIS!
    //   KEEP READING
    // !!!!!!!!!!!!!!!!
    if (strs) {
        if (typeof strs === "object") {
            for (const s of strs) {
                console.log(s);
            }
        } else if (typeof strs === "string") {
            console.log(strs);
        }
    }
}