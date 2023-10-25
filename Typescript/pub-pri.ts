// All the properties that is not marked as private or public , they are always marked as public.
class User {
    public name: string;
    private age: number;
    public email: string;
    private readonly city: string = "Habra";
    constructor(name: string, age: number, email: string) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

const Rohit = new User("Rohit Paul", 19, "rohit@.com");
Rohit.city = "Habra"; //Error, because city is a readonly property of user.

// Modern code

class modernUser {
    private readonly city: string = "Habra";
    constructor (
        public name: string,
        public email:string ,
        private userID:string,
    ){}
}

const rohit = new modernUser("Rohit Paul", "rohit@.com", "@93#8$40djf");