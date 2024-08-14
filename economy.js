const form = document.getElementById("form-economy");
const username = document.getElementById("username");
const numero = document.getElementById("numero");
const email = document.getElementById("email");
const valorEnergia = document.getElementById("valor-energia");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkInputUsername();
});

function checkInputUsername() {
    const usernameValue = username.value;
    if(usernameValue == ""){
        errorInput(username, "Escreva seu nome")
    }
        console.log(usernameValue)
}

function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.className = "form-content error";
}
