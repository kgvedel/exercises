"use strict";

window.addEventListener("load",init);

const model = [8, 12, 32, 4, 13, 24, 23, 22, 1, 0, 30, 7, 3, 6, 3, 19, 24, 29, 14, 16, 3, 1, 9, 8, 30, 12, 0, 30, 7, 3, 6, 3, 19, 24, 29, 14, 4, 1, 18, 1];

let speed = 500;


function init(){
   setTimeout(loop, speed);

}

function loop (){
    displayData();
    modifyModel();

}

function getNumberOfCostumers(){
    return Math.floor(Math.random()*32);

}

function displayData(){

    let bar = document.querySelectorAll(".bar");
    let height;
    for(let i = 0; i < 40; i++){
        height = model[i];
        bar[i].style.height = height+"%";
    }

    init();
    
}

function modifyModel(){
 const queueSize = getNumberOfCostumers();

 model.unshift(queueSize);
 model.length = 40;

    
    console.log(model);
}
