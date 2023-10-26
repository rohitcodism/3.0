//Abstract classes
abstract class takePhoto {
    constructor(public cameraMode: string, public filter: string) {}

    // Abstract methods are the methods that must be implemented in the derived class. It must not have any implementation in the abstract class.
    abstract getSepia():void
    getReelTime(): number {
        return 5;
    
    }
}

const rp = new takePhoto("portrait", "vintage"); 
// Error: Cannot create an instance of an abstract class. because takePhoto is an abstract class. Abstract classes are mainly for inheritance where other classes may derive from them. They cannot be instantiated directly.

// We can create object of a class which is not an abstract class and which is inheriting an abstract class.
class Instagram extends takePhoto {
    constructor(public username: string, public cameraMode: string, public filter: string) {
        super(cameraMode, filter);
    }

    // We must implement the abstract methods of abstract class.
    getSepia(): void {
        console.log("Getting Sepia");
    }

    // We can override the methods of abstract class.
    getReelTime(): number {
        return 13;
    }
}

const rpInsta = new Instagram("rp", "portrait", "vintage"); 
// No error, because Instagram is not an abstract class. But it's parent class is an abstract class. So, it's mandatory to pass the parameters of it's parent class And We can create object of Instagram class.

rpInsta.getReelTime(); // 5
rpInsta.getSepia(); // Getting Sepia