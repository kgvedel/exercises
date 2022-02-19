"use strict";

window.addEventListener("load",init);
let speed = 500;

function init(){
    setTimeout(loop, speed);
}

function loop(){

}

function artworkOne(){
    let box = document.querySelector("#artwork1");
    let height;
    let width;

    for(let i=100; i < 300; i+=20){
        height = box[i].style.height + "px";
        width = box[i].style.width + "px";
    }

}