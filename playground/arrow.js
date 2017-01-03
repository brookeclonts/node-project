var square = (x) => {
    return x * x;
}

var square2 = (x) => x * x;

var square3 = x => x * x;

// square = square2 = square3;

var user = {
    name : 'Andrew',
    // 'this' binding doesn't work with the below function
    // you're not going to get 'arguments' keyword either
    // sayHi : () => {
    //     console.log(`Hi ${this.name}`);
    // },
    sayHiAlt () {
        console.log(arguments);
        console.log(`Hi ${this.name}`);
    }
}

user.sayHiAlt(1, 2, 3);