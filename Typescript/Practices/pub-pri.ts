// All the properties that is not marked as private or public , they are always marked as public.
class User {
    protected nickname: string;
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

// Inheritance, super, protected
// super: The super keyword is used to access and call functions on an object's parent.
// protected: The protected keyword is similar to private, except that protected members can be accessed using their deriving classes.
class anotherTypeUser extends User {
    githubID: string;
    constructor(name: string, age: number, email: string, githubID: string) {
        super(name, age, email);
        this.githubID = githubID;
        this.nickname = "Anu";
    }
}