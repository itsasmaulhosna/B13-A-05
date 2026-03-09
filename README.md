1.Difference between var,let and const
#.var:It is function scope and hoisted. Here reassignment and redeclaration is allowed in same scope.
var x = 10;
x = 20;  
var x = 30;

#.let:It is block-scoped. It is hoisted but Temporal Dead Zone(TDZ). Here reassignment is allowed but redeclaration is not allowed in same scope.
let y = 5;
y = 10; //Reassignment allowed
//let y = 15; // Redeclaration is not allowed

#.const: It is block-scoped. It is hoisted and Temporal Dead Zone(TDZ). Here reassignment and redeclaration is not allowed.Constants, fixed values, object reference.
const z = 100;
// z = 200; // cannot reassign
// const z = 300; // redeclaration not allowed

2.Spread Operator (...)
Spread Operator (...) in javascript used to spread the element of array or object.It helps to copy, merge, or add elements easily.
const num = [ 2,4,5];
const newNum = [...numbers,6,7 ];
output=[ 2,4,5,6,7]

3.Difference between map(), filter(), and forEach()
#map(),creat a new array by applying a function to each element. The length of new array remaining same as the orginal array.
const numbers = [1, 2, 3];

const doubled = numbers.map(num => num + 2);
output=[ 3,4,5 ]

#filter(),Creates a new array with elements that pass a condition.
const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);
output=[2, 4]

#forEach(),It executes a function for each element in the array.It does not return new array.
const numbers = [1, 2, 3];
numbers.forEach(num => {
console.log(num);
});

4.Arrow Function
Arrow Function is a short syntax to write function. => it is the symbol of arrow function.
const add = (2, 3) => {
return 2 + 3;
};

5.Template Literals
Template Literals is a feature in JavaScript that allow you to create strings using backticks (`` ` ``) istated of single or double quotes (' '/" ").

const name = "Asma";
const message = `Hello, ${name}!`;
console.log(message);

output=Hello,Asma!
