"use strict";

window.addEventListener("DOMContentLoaded", start);

//Template object for student
const Student ={
    firstname: "",
    middlename: "",
    nickname: "",
    lastname: "",
    gender: "",
    house: "",
    bloodtype: "",
    image: ""
}

//The student array
let allStudents = [];

//Variable for the filter function
let filteredStu;

function start(){
    console.log("start");

    //Here I add eventlistener for all my filter buttons
     document.querySelectorAll("[data-action='filter']").forEach((btn) => {
        btn.addEventListener("click", studentClick);
    });
    
    //Here I call functions
    loadJSON();

}


 function studentClick(evt){
    const myFilter = evt.target.dataset.filter;
    if (myFilter === "*"){
        filteredStu = allStudents;
        displayList(filteredStu);
    } else {
        isStudent(myFilter);
    }

    console.log("Yo", evt.target.dataset.filter);
}

function isStudent(house){
    console.log("House", house);

    let list = allStudents.filter(isStudentType);

    function isStudentType(student){
        if(student.house === house){
            return true;
        } else {
            return false;
        }
    }
    displayList(list);
}



//Here I fetch the data for both json files
async function loadJSON() {
    //Json over students
    const response = await fetch('https://petlatkea.dk/2021/hogwarts/students.json');
    const jsonData = await response.json();

    //Json over blood data
    const responseB = await fetch('https://petlatkea.dk/2021/hogwarts/families.json');
    const jsonDataB = await responseB.json();

    //Calling my preparedObjects function with jsonData as parameter.

    preparedObjects(jsonData);
    bloodType(jsonDataB);

    console.log( jsonData);
    
}

//Preparing the array and implementing it in the template Student and adding new variables
    function preparedObjects(jsonData, jsonDataB){

        jsonData.forEach(jsonObject => {

            //Creating new object
            const student = Object.create(Student);

            //First I trim the array, so I am sure that when I split it, the names with first and lastname only contains an index of 2 instead of 3
            let originalName = jsonObject.fullname.trim();
            //Here I am splitting the string into array, so I can define variables for each index.
            originalName = originalName.split(" ");
            let firstname = originalName[0].charAt(0).toUpperCase() + originalName[0].substring(1).toLowerCase();
            let middlename;
            let lastname;
            let nickname;

            let gender = jsonObject.gender;
            let house = jsonObject.house.trim();
            
            //I console it to check the length of the splittet string in objects
            console.log(originalName.length);

            //Making an if statement, so if the length of the splittet array is equal to 1, then lastname is the middlename and the other way around
            if(originalName.length === 2){
                lastname = originalName[1].charAt(0).toUpperCase() + originalName[1].substring(1).toLowerCase();
               
            } else if (originalName.length === 3){
               middlename = originalName[1].charAt(0).toUpperCase() + originalName[1].substring(1).toLowerCase();
               lastname =  originalName[2].charAt(0).toUpperCase() + originalName[2].substring(1).toLowerCase();
          
if(middlename.includes(`"`)){
    middlename = undefined;
    nickname = originalName[1];
    //Here I remove the "" from the nicknames and make them set to Uppercase at first letter
    let firstQuotationmark = nickname.indexOf(`"`);
    let lastQuotationmark = nickname.lastIndexOf(`"`);
    nickname = nickname.substring(firstQuotationmark + 1, lastQuotationmark).charAt(0).toUpperCase() + nickname.substring(firstQuotationmark + 1, lastQuotationmark).substring(1).toLowerCase();
}

            }


            function getImage(firstname, lastname) {
                let image
                if(lastname == "Patil"){
                    image = `images/${lastname.substring(lastname.lastIndexOf(""), lastname.indexOf("-") + 1)
                    .toLowerCase()}_${firstname.toLowerCase()}.png`;
                } else{
                 image = `images/${lastname.substring(lastname.lastIndexOf(""), lastname.indexOf("-") + 1)
                .toLowerCase()}_${firstname.substring(0, 1).toLowerCase()}.png`;
            }
                return image;
            
              }
              if (lastname) {
                student.image = getImage(firstname, lastname);
              } else student.image = null;
            

            //Here I declare it so it fits to the template and make sure to join the fullname
            student.firstname = firstname;
            student.middlename = middlename;
            student.nickname = nickname;
            student.lastname = lastname;
            student.gender = gender.charAt(0).toUpperCase() + gender.substring(1).toLowerCase();
            student.house = house.charAt(0).toUpperCase() + house.substring(1).toLowerCase();  
            
            if (lastname) {
            student.image = getImage(firstname, lastname);
            } else student.image = "images/null.png";

            

            //Here I push my array into the student template
            allStudents.push(student); 
           
        });

        displayList(allStudents);
        countingStudent(allStudents);


    }


    function bloodType(addBlood){
        const pureblood = addBlood.pure;
        const halfblood = addBlood.half;

        allStudents.forEach((student) => {
            pureblood.forEach((pure) => {
                if(student.lastname === pure){
                    student.blood = "pure";
                } else {
                    halfblood.forEach((half) => {
                        if (student.lastname === half){
                            student.blood = "half";
                        }
                    });
                }
            });
            if(!student.blood) {
                student.blood = "Muggle";
            }
            console.log(student);
        });

    }

//Here is my displaylist function where I copy my array into the displaystudent function
     function displayList(students){
        //Clear the list
      document.querySelector("#student_list").innerHTML = "";
        //Build a new list
     students.forEach(displayStudent);
    }


    //Here I display all the students in the article/list
    function displayStudent(student){
        //Creating a clone
        const clone = document.querySelector("#student_template").content.cloneNode(true);
        
        // set clone data
        clone.querySelector("[data-field=firstname]").textContent = "Firstname: " + student.firstname;
        clone.querySelector("[data-field=nickname]").textContent = "Nickname: " + student.nickname;
        clone.querySelector("[data-field=middlename]").textContent = "Middlename: " + student.middlename;
        clone.querySelector("[data-field=lastname]").textContent = "Lastname: " + student.lastname;
        clone.querySelector("[data-field=gender]").textContent = "Gender: " + student.gender;
        clone.querySelector("[data-field=house]").textContent = "House: " + student.house;
        clone.querySelector(".image").src = student.image;
       // clone.querySelector(".image").src = "images/" + student.lastname.substring(student.lastname.lastIndexOf(""), student.lastname.indexOf("-") + 1).toLowerCase() + "_" + student.firstname.substring(0, 1).toLowerCase() + ".png";

        // append clone to list
        document.querySelector("#student_list").appendChild( clone );

    } 

    //Here is my counter function where I show how many students in every house and total
    function countingStudent(student){

        //Here I call the counter for the students
        displayCountingStudent(totalStudents(), gryffindorStudent(), slytherinStudent(), hufflepuffStudent(), ravenclawStudent());

        function totalStudents(){
            return student.length;
        }

        function gryffindorStudent() {
            let counter = 0;
            for (let i = 0; i < student.length; i++) {
                if (student[i].house === 'Gryffindor') counter++;
            }
            console.log(counter);
            return counter;
        }
            
        function slytherinStudent() {
            let counter = 0;
            for (let i = 0; i < student.length; i++) {
                if (student[i].house === 'Slytherin') counter++;
            }
            console.log(counter);
            return counter;
        }

        function hufflepuffStudent() {
            let counter = 0;
            for (let i = 0; i < student.length; i++) {
                if (student[i].house === 'Hufflepuff') counter++;
            }
            console.log(counter);
            return counter;
        }

        function ravenclawStudent() {
            let counter = 0;
            for (let i = 0; i < student.length; i++) {
                if (student[i].house === 'Ravenclaw') counter++;
            }
            console.log(counter);
            return counter;
        }

        
    }

    function displayCountingStudent(total, hufflepuffNumber, ravenclawNumber, gryffindorNumber, slytherinNumber, expelled) {
        document.querySelector(".total").textContent += total;
        document.querySelector(".hpStudents").textContent += " " + hufflepuffNumber;
        document.querySelector(".rcStudents").textContent += " " + ravenclawNumber;
        document.querySelector(".gdStudents").textContent += " " + gryffindorNumber;
        document.querySelector(".srStudents").textContent += " " + slytherinNumber;
    }