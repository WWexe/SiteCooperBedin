const form = document.getElementById("form-economy");
const username = document.getElementById("username");
const numero = document.getElementById("numero");
const email = document.getElementById("email");
const valorEnergia = document.getElementById("valor-energia");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkInputUsername();
    checkInputEmail();
    checkInputvalorEnergia();
    checkInputnumero();
});

function checkInputUsername() {
    const usernameValue = username.value;
    if(usernameValue === ""){
        errorInput(username, "Informe um Nome válido")
    }else {
        const formItem = username.parentElement;
        formItem.className = "form-content"
        console.log(usernameValue)
    }
}
function checkInputEmail() {
    const emailValue = email.value;
    if(emailValue === ""){
        errorInput(email, "Informe um Email válido")
    }else {
        const formItem = email.parentElement;
        formItem.className = "form-content"
        console.log(emailValue)
    }
}
function checkInputvalorEnergia() {
    const valorEnergiaValue = valorEnergia.value;
    if(valorEnergiaValue === ""){
        errorInput(valorEnergia, "Informe um Valor válido")
    }else {
        const formItem = valorEnergia.parentElement;
        formItem.className = "form-content"
        console.log(valorEnergiaValue)
    }
}
function checkInputnumero() {
    const numeroValue = numero.value;

    if(numeroValue === ""){
        errorInput(numero, "Informe um Numero válido")
    }else if(numeroValue.length < 11) {
        errorInput(numero, "Seu Numero dever ter DD + 9 digitos");
    }else {
        const formItem = numero.parentElement;
        formItem.className = "form-content"
        console.log(numeroValue)
    }   
}
function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.className = "form-content error";
}
