"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greet(person) {
    return "Hello " + person.name;
}
const user = { name: "Jane User", age: 20 };
console.log(user, greet({ name: "test", age: 20 }));
