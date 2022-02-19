//Mathilde and Katrine have been doing this assignment together and dying together #romeo&julietstyle


let stringing = document.getElementById('name').value;
let result;
let dropdown = document.getElementById('dropdown').value;
let output = document.getElementById('res');

const btn = document.querySelector("button");



startForm();

function startForm(){
    btn.addEventListener("click", clickButton);

}

function clickButton(){
console.log("input is: "+ stringing);
stringing = document.getElementById('name').value;
dropdown = document.getElementById('dropdown').value;
document.removeEventListener("click", clickButton);

changeValue();
}

function changeValue(){
    switch (dropdown){
       
        case "0":
           result = stringing.charAt(0).toUpperCase() + stringing.substring(1).toLowerCase();
           console.log("find  - case 0");
            break;
        case "1":
            result = stringing.slice(0,stringing.indexOf(" "));
            console.log("find first name- case 1");
           break;
        case "2":
            result = stringing.indexOf(" ");
           console.log("find length - case 2");
            
    }
//let upperAndLower = stringing.charAt(0).toUpperCase() + stringing.substring(1).toLowerCase(); 
//let findLength = stringing.indexOf(" ");
//let firstNamefind = stringing.slice(0,findLength);

//console.log(upperAndLower);
//console.log(findLength);
//console.log(firstNamefind);

console.log("result is " + result);

output.textContent = result;

}


   



