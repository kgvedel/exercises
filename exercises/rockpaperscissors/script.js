start();

function start(){
    console.log("start");
    getUserSelection();
    document.querySelector("rock").addEventListener("click", clickRock);
}

function getUserSelection(){
    console.log();
    makeRandomComputerChoice();

}

function clickRock(){
    console.log("clickRock");
    document.querySelector("player1").classList.add("paper");
}

function makeRandomComputerChoice(){
    showAnimations();
}

function showAnimations(){
    document.querySelector("#player1").classList.add("shake");
    document.querySelector("#player2").classList.add("shake");
    determineWinner();
}

let winner = "";

function determineWinner(){
    winner = "computer";

    showWin();
}

function showWin(){
    console.log("Show win!");
}

function showLose(){

}

function showDraw(){
    
}