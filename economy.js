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
    }
        console.log(usernameValue)
}
function checkInputEmail() {
    const emailValue = email.value;
    if(emailValue === ""){
        errorInput(email, "Informe um Email válido")
    }
        console.log(emailValue)
}
function checkInputvalorEnergia() {
    const valorEnergiaValue = valorEnergia.value;
    if(valorEnergiaValue === ""){
        errorInput(valorEnergia, "Informe um Valor válido")
    }
        console.log(valorEnergiaValue)
}
function checkInputnumero() {
    const numeroValue = numero.value;
    if(numeroValue === ""){
        errorInput(numero, "Informe um Numero válido")
    }
        console.log(numeroValue)
}
function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.className = "form-content error";
}
