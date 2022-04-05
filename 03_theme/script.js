const form = document.querySelector("form");

form.elements.ccn.addEventListener("input", test);

form.elements.date.addEventListener("input", test);

form.elements.cvc.addEventListener("input", test);

function test (e) {
 if(e.target.value.length == e.target.maxLength){
        e.target.nextElementSibling.focus();
        e.target.disabled=true;    }
    
}
