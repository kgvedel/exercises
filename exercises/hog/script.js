//Mathilde and Katrine have been working together with this assignment, therefore there is similarities in both codes, but its made individually

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
    blood: "",
    image: "",
    inquisitorial: false, 
    prefect: false
}

//The student array
let allStudents = [];

//Variable for the filter function
let filteredStu;

//Function that starts the whole systaaaaam
function start(){
    console.log("start");

    //Here I call functions
    loadJSON();
    registerButtons();

}

function registerButtons(){
   
    //Here I add eventlistener for all my filter buttons
    document.querySelectorAll("[data-action='filter']").forEach((btn) => {
        btn.addEventListener("click", studentClick);
    });
    //Here I add eventlistener for my searchbar button
    document.querySelector("#searchField").addEventListener("input", searchInput);
    
}

//Here is the event and if statement for the filterfunction
 function studentClick(evt){
    const myFilter = evt.target.dataset.filter;
    if (myFilter === "*"){
        filteredStu = allStudents;
        displayList(filteredStu);
    } else {
        isStudent(myFilter);
    }

    //console.log("Yo", evt.target.dataset.filter);
}

//Here is my filter function for each houses
function isStudent(house){
    //console.log("House", house);

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


//Here I fetch the data for both json files for students and bloodstatus
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

    //console.log( jsonData);
    
}

//Preparing the array and implementing it in the template Student and adding new variables
    function preparedObjects(jsonData){

        jsonData.forEach(jsonObject => {

            //Creating new object
            const student = Object.create(Student);

            //First I trim the array, so I am sure that when I split it, the names with first and lastname only contains an index of 2 instead of 3
            let originalName = jsonObject.fullname.trim();
            //Here I am splitting the string into array, so I can define variables for each index.
            originalName = originalName.split(" ");
            let fullName;
            let firstname = originalName[0].charAt(0).toUpperCase() + originalName[0].substring(1).toLowerCase();
            let middlename;
            let lastname = "";
            let nickname;       
            let gender = jsonObject.gender;
            let house = jsonObject.house.trim();
            
            //I console it to check the length of the splittet string in objects
            //console.log(originalName.length);

            //Making an if statement, so if the length of the splittet array is equal to 1, then lastname is the middlename and the other way around
            if(originalName.length === 2){
                lastname = originalName[1].charAt(0).toUpperCase() + originalName[1].substring(1).toLowerCase();
                fullName = firstname + " " + lastname;
               
            } else if (originalName.length === 3){
               middlename = originalName[1].charAt(0).toUpperCase() + originalName[1].substring(1).toLowerCase();
               lastname =  originalName[2].charAt(0).toUpperCase() + originalName[2].substring(1).toLowerCase();
               fullName = firstname + " " + middlename + " " + lastname;
          
            if(middlename.includes(`"`)){
                middlename = undefined;
                nickname = originalName[1];
                //Here I remove the "" from the nicknames and make them set to Uppercase at first letter
                let firstQuotationmark = nickname.indexOf(`"`);
                let lastQuotationmark = nickname.lastIndexOf(`"`);
                nickname = nickname.substring(firstQuotationmark + 1, lastQuotationmark).charAt(0).toUpperCase() + nickname.substring(firstQuotationmark + 1, lastQuotationmark).substring(1).toLowerCase();
            }

            }

            //Function to get the images to each student
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
            
              if (lastname) {
                student.image = getImage(firstname, lastname);
                } else student.image = "images/null.png";
    


            //Here I declare it so it fits to the template and make sure to join the fullname
            student.firstname = firstname;
            student.middlename = middlename;
            student.nickname = nickname;
            student.lastname = lastname;
            student.gender = gender.charAt(0).toUpperCase() + gender.substring(1).toLowerCase();
            student.house = house.charAt(0).toUpperCase() + house.substring(1).toLowerCase();  
            

            //Here I push my array into the student template
            allStudents.push(student); 
           
        });

        //Calling my functions
        displayList(allStudents);
        countingStudent(allStudents);


    }

    //Here I make a function saying for each student with if statements determine wether a student is half, pure or muggle
    function bloodType(addBlood) {
        const pureblood = addBlood.pure;
        const halfblood = addBlood.half;
    
        allStudents.forEach((student) => {
            pureblood.forEach((pure) => {
                if (student.lastname === pure) {
                    student.blood = "Pureblood 🩸";
                } else
                    halfblood.forEach((half) => {
                        if (student.lastname === half) {
                            student.blood = "Halfblood ✨";
                        }
                    });
            });
    
            if (!student.blood) {
                student.blood = "Muggle 👀";
            }
        });
    displayList(allStudents);
    }

    //Here is my displaylist function where I copy my array into the displaystudent function
     function displayList(students){
        //Clear the list
      document.querySelector("#student_list").innerHTML = "";
        //Build a new list
      students.forEach(displayStudent);
    }

    function addStyles(studenthouse, dest) {
        dest.className = "";
        dest.classList.add(studenthouse);
    }
    

    //Here I display all the students in the article/list
    function displayStudent(student){
        //Creating a clone
        const clone = document.querySelector("#student_template").content.cloneNode(true);
        const popUpArticle = clone.querySelector(".showMbtn");
        
        // set clone data and showing full name, image and house on the list
        clone.querySelector("[data-field=fullname]").textContent = `${student.firstname} ${student.middlename} ${student.lastname}`;
        clone.querySelector("[data-field=house]").textContent = "House: " + student.house;
        clone.querySelector(".image").src = student.image;

        if (!student.middlename) {
            clone.querySelector("[data-field=fullname]").textContent = `${student.firstname} ${student.lastname}`;
        }
        if (!student.lastname) {
            clone.querySelector("[data-field=fullname]").textContent = student.firstname;
        }


        //Inq squad goals
        if (student.inquisitorial === true){
            clone.querySelector("[data-field=inquisitorial]").textContent = "⭐";
            
        } else {
            clone.querySelector("[data-field=inquisitorial]").textContent = "☆";
            
        }

        //Adding eventlistener for inq + prefect
        clone.querySelector("[data-field=inquisitorial]").addEventListener("click", clickInq);

        function clickInq(){
        if(student.blood === "Pureblood 🩸" || student.house === "Slytherin"){
            if(student.inquisitorial === true){
                student.inquisitorial = true;
            } else {
                student.inquisitorial = true;
            }
        displayList(allStudents);
        } else {
            alert("Omg chill, its only a club for 🩸 and 🐍");
          }
        }
       
        //Adding an eventlistener for the popup window
         popUpArticle.addEventListener("click", () => showDetails(student));

        // append clone to list
        document.querySelector("#student_list").appendChild( clone );

    } 

//Here I make my search function
function searchInput(evt){
    console.log("Search button works");
    
    displayList(
        allStudents.filter((elm) => {
          return elm.firstname.toUpperCase().includes(evt.target.value.toUpperCase()) || elm.lastname.toUpperCase().includes(evt.target.value.toUpperCase());
        })
      );

}

    //Here is my function for showing details for the popup window
    function showDetails(student){
        const popup = document.querySelector("#popup");
        const detailArticle = document.querySelector("#popupWindow");

    popup.querySelector("[data-field=firstname]").textContent = "Firstname: " + student.firstname;
    popup.querySelector("[data-field=nickname]").textContent = "Nickname: " + student.nickname;
    popup.querySelector("[data-field=middlename]").textContent = "Middlename: " + student.middlename;
    popup.querySelector("[data-field=lastname]").textContent = "Lastname: " + student.lastname;
    popup.querySelector("[data-field=gender]").textContent = "Gender: " + student.gender;
    popup.querySelector("[data-field=blood]").textContent = "Bloodtype: " + student.blood;
    popup.querySelector(".crest").src = `crest/${student.house}.png`;
    popup.querySelector(".image").src = student.image;

    if (student.inquisitorial === true){
        popup.querySelector("[data-field=inquisitorial]").textContent = "⭐";
        
    } else {
        popup.querySelector("[data-field=inquisitorial]").textContent = "☆";
        
    }

    //set display style to block to make visible
    popup.style.display = "block";


    //Here I add event with click to close the popup window
    document.querySelector("#close").addEventListener("click", () => popup.style.display = "none");
   

    //Here I call my style function so every house gets a theme at the popup
    addStyles(student.house, detailArticle);

}

    //Here is my counter function where I show how many students in every house and total
    function countingStudent(student){

        //Here I call the counter for the students
        displayCountingStudent(totalStudents(), gryffindorStudent(), slytherinStudent(), hufflepuffStudent(), ravenclawStudent());

        //Here I make the functions that I call for the counter
        function totalStudents(){
            return student.length;
        }

        function gryffindorStudent() {
            let counter = 0;
            for (let i = 0; i < student.length; i++) {
                if (student[i].house === 'Gryffindor') counter++;
            }
            return counter;
        }
            
        function slytherinStudent() {
            let counter = 0;
            for (let i = 0; i < student.length; i++) {
                if (student[i].house === 'Slytherin') counter++;
            }

            return counter;
        }

        function hufflepuffStudent() {
            let counter = 0;
            for (let i = 0; i < student.length; i++) {
                if (student[i].house === 'Hufflepuff') counter++;
            }
            return counter;
        }

        function ravenclawStudent() {
            let counter = 0;
            for (let i = 0; i < student.length; i++) {
                if (student[i].house === 'Ravenclaw') counter++;
            }
            return counter;
        }

        
    }

    //Here I display all the numbers of the students and houses
    function displayCountingStudent(total, hufflepuffNumber, ravenclawNumber, gryffindorNumber, slytherinNumber, expelled) {
        document.querySelector(".total").textContent += " " + total;
        document.querySelector(".hpStudents").textContent += " " + hufflepuffNumber;
        document.querySelector(".rcStudents").textContent += " " + ravenclawNumber;
        document.querySelector(".gdStudents").textContent += " " + gryffindorNumber;
        document.querySelector(".srStudents").textContent += " " + slytherinNumber;
    }