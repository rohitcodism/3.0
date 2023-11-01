class modernUser {
    private _courseCount = 0;

    private readonly city: string = "Habra";
    constructor (
        public name: string,
        public email:string ,
        private userID:string,
    ){}

    // Like private properties, private methods can also be accessed only from within the same class
    private deleteToken():string{
        return "Deleted Token";
    }

    // getter
    // A getter is a method that gets called every time we try to access a value from a property, also it must have a return type
    get getAppleEmail(): string {
        return `apple${this.email}`;
    }

    // getter
    get getCourseCount(): number {
        return this._courseCount;
    }

    // setter
    // A setter is a method that gets called every time we try to set a value to a property, also it can't have any return type
    set setCourseCount(count: number) {
        if(count<0){
            throw new Error("Invalid course count");
        }else{
            this._courseCount = count;
        }
    }
}

const rohit = new modernUser("Rohit Paul", "rohit@.com", "@93#8$40djf");

rohit.deleteToken(); // Error: Property 'deleteToken' is private and only accessible within class 'modernUser' because it is a private method.