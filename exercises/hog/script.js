"use strict";

window.addEventListener("DOMContentLoaded", start);

//Template object for student
const Student ={
    fullname: "",
    firstname: "",
    middlename: "",
    nickname: "",
    lastname: "",
    gender: "",
    house: "",
    bloodstatus: "",
    image: "",
}

//The student array
let allStudents = [];

function start(){
    console.log("start");
    loadJSON();
}


async function loadJSON() {
    const response = await fetch("jason_derulo.json");
    const jsonData = await response.json();

    //Calling my preparedObjects function with jsonData as parameter.
    preparedObjects(jsonData);
    
}

    //Preparing the array and implementing it in the template Student and adding new variables
    function preparedObjects(jsonData){
        jsonData.forEach(jsonObject => {

            //Creating new object
            const student = Object.create(Student);

            //First I trim the array, so I am sure that when I split it, the names with first and lastname only contains an index of 2 instead of 3
            const fullName = jsonObject.fullname.trim();
            //Here I am splitting the string into array, so I can define variables for each index.
            let fullname = fullName.split(" ");
            let firstname = fullname[""];
            let middlename = fullname[""];
            let lastname = fullname[""];
            const gender = jsonObject.gender;
            const house = jsonObject.house;
            
            //I console it to check the length of the splittet string in objects
            console.log(fullname.length);

            //Making an if statement, so if the length of the splittet array is equal to 1, then lastname is the middlename and the other way around
            if(fullname.length === 2){
                firstname = fullname[0];
                lastname = fullname[1];
                //middleName = lastName;
            } else {
                firstname = fullname[0];
                middlename = fullname[1];
                lastname = fullname[2];
            }

            //Here I make sure the first letter is uppercase and the rest is lowercase
            firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1).toLowerCase();
            //console.log(`Firstname: ${firstName} Middlename: ${middleName} Lastname: ${lastName}`);

            //Here I declare it so it fits to the template and make sure to join the fullname
            student.fullname = fullname.join(" ");
            student.firstname = firstname;
            student.middlename = middlename;
           // student.nickname = nickname;
            student.lastname = lastname;
            student.gender = gender;
            student.house = house;

/*             const firstSpace = fullname.indexOf(" ");
            const lastSpace = fullname.lastIndexOf(" ");
            const firstLine = fullname.indexOf("/");
            const lastLine = fullname.lastIndexOf("/");


            const firstname = fullname.substring(0, firstSpace);
            const middlename = fullname.substring(firstSpace+1,lastSpace);
            const nickname = fullname.substring(firstLine, lastLine)
            const lastname = fullname.substring(lastSpace);

            console.log(`Firstname: ${firstName} Middlename: ${middleName} Lastname: ${lastName}`);

            student.firstname = firstname;
            student.middlename = middlename;
            student.nickname = nickname;
            student.lastname = lastname;*/

            allStudents.push(student); 
           

            
        });
        displayList();
    }

     function displayList(){
        //Clear the list
        document.querySelector("#list tbody").innerHTML = "";

        //Build a new list
        allStudents.forEach(displayStudent);
    }

    function displayStudent(student){
        //Creating a clone
        const clone = document.querySelector("#student").content.cloneNode(true);
        
                // set clone data
        clone.querySelector("[data-field=fullname]").textContent = student.fullname;
        clone.querySelector("[data-field=firstname]").textContent = student.firstname;
       // clone.querySelector("[data-field=nickname]").textContent = student.type;
        clone.querySelector("[data-field=middlename]").textContent = student.middlename;
        clone.querySelector("[data-field=lastname]").textContent = student.lastname;
        clone.querySelector("[data-field=gender]").textContent = student.gender;
        clone.querySelector("[data-field=house]").textContent = student.house;



        // append clone to list
        document.querySelector("#list tbody").appendChild( clone );
    
    
    
    } 