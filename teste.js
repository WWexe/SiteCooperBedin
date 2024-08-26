document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const energia = document.getElementById("energia");
  
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
    energia.addEventListener('input', checkInputEnergia);
  
    username.addEventListener('blur', checkInputUsername);
    email.addEventListener('blur', checkInputEmail);
    mobile.addEventListener('blur', checkInputMobile);
    energia.addEventListener('blur', checkInputEnergia);
  
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
        const usernameValue = username.value.trim();
        const formItem = username.parentElement;

        if (usernameValue === "") {
            errorInput(username, "Informe seu nome");
        } else {
            formItem.className = "form-content";
        }
    }
  
    function checkInputEmail() {
        const emailValue = email.value.trim(); 
    
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|cn|net)$/;
    
        const formItem = email.parentElement;

        if (emailValue === "") {
            errorInput(email, "Informe um E-mail válido!");
        } 
        else if (!emailPattern.test(emailValue)) {
            errorInput(email, "Informe um e-mail válido");
        } else {
            formItem.className = "form-content";
        }
    }
  
    function checkInputMobile() {
        const mobileValue = mobile.value.trim();
        const formItem = mobile.parentElement;

        if (mobileValue.length <= 12) { 
            errorInput(mobile, "Informe um número de telefone válido");
        } else {
            formItem.className = "form-content";
        }
    }
    
    function checkInputEnergia() {
        const energiaValue = energia.value.trim();
        const formItem = energia.parentElement;

        if (isNaN(energiaValue) || energiaValue === "") {
            errorInput(energia, "Informe um valor numérico válido");
        } else {
            formItem.className = "form-content";
        }
    }

    function checkForm() {
        checkInputUsername();
        checkInputEmail();
        checkInputMobile();
        checkInputEnergia();
  
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

        if (input === document.activeElement) {
            textMessage.innerText = message;
            formItem.className = "form-content error";
        }
    }
});
