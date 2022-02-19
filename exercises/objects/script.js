const student1 ={
    firstName: "Katrine",
    lastName: "Vedel"

}

const student2 ={
    firstName: "Katrine",
    lastName: "Vedel"

}

student1.firstName = "vedelsvedel";

console.log(student1);
console.log(student2);
/* const student2 = student1; */

/* if (student1 == student2){
    console.log("SAME");
} else {
    console.log("NOT");
}
 */
/* 
Mutabillity øvelser
let person1 ={
    firstName: "Katrine",
    age: "24",
    student: true
}

let person2 ={
    firstName: "other Katrine",
    age: "23",
    student: true
}

let person3 = person1;
person3.firstName = "changed";

person3 = person2;

person2.firstName = "also changed";

person1 = person3;
 */
/*
Mutabillity øvelse 1 og 2
const person1 ={
    firstName: "Katrine",
    age: "24",
    student: true
}

const person2 = person1;
let person3 = person1;
person2.firstName = "other Katrine";
console.log(person1.firstName);
*/

/*
Øvelse 1

console.log(person1.lastName);
person1.lastName = "Vedel";
console.log(person1.lastName);
person1.lastName = undefined;
console.log(person1.lastName);
console.log(person1.middleName);

delete person1.lastName;
console.log(person1.lastName);

Øvelse 2 og 3
const person2 ={
    firstName: "Katrine",
    age: "26",
    student: true
}

person1 = person2;
person1.age++;
console.log(person1);

*/