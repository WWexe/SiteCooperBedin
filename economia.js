document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
  
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        checkForm();
    });
  
    username.addEventListener('input', checkInputUsername);
    email.addEventListener('input', checkInputEmail);
    mobile.addEventListener('input', () => {
        formatPhone(event);
        checkInputMobile();
    });
  
    function formatPhone(event) {
        let value = event.target.value.replace(/\D/g, ''); 
  
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/g, '$1 $2');
        }
        if (value.length > 7) {
            value = value.replace(/(\d{5})(\d{1,4})$/, '$1-$2'); 
        }
  
        event.target.value = value;
    }
  
    function checkInputUsername() {
        const usernameValue = username.value;
  
        if (usernameValue === "") {
            errorInput(username, "Informe seu nome");
        } else {
            const formItem = username.parentElement;
            formItem.className = "form-content";
        }
    }
  
    function checkInputEmail() {
        const emailValue = email.value;
  
        if (emailValue === "") {
            errorInput(email, "Informe um E-mail válido!");
        } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
            errorInput(email, "Informe um e-mail válido");
        } else {
            const formItem = email.parentElement;
            formItem.className = "form-content";
        }
    }
  
    function checkInputMobile() {
        const mobileValue = mobile.value;
  
        if (mobileValue.length <= 12) { 
            errorInput(mobile, "Informe um número de telefone válido");
        } else {
            const formItem = mobile.parentElement;
            formItem.className = "form-content";
        }
    }
  
    function checkForm() {
        checkInputUsername();
        checkInputEmail();
        checkInputMobile();
  
        const formItems = form.querySelectorAll(".form-content");
  
        const isValid = [...formItems].every((item) => {
            return item.className === "form-content";
        });
  
        if (isValid) {
            console.log("username: " + username.value);
            console.log("email: " + email.value);
            console.log("phone: " + mobile.value);
            document.getElementById("form").reset();
            alert("TUDO SAFE MEU PATRAO");
            return true;
        }
    }
  
    function errorInput(input, message) {
        const formItem = input.parentElement;
        const textMessage = formItem.querySelector("a");
  
        textMessage.innerText = message;
        formItem.className = "form-content error";
    }
  });
  