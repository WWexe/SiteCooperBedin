document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const energia = document.getElementById("energia");
    const resultField = document.getElementById('resultado');
    const resultMesField = document.getElementById('resultadoMes');

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        checkForm();
    });

    energia.addEventListener('input', () => {
        const inputValue = parseFloat(energia.value) || 0;
        const result = inputValue + (inputValue * 0.2);
        const resultMes = inputValue * 0.1;

        resultField.value = result.toFixed(2);
        resultMesField.value = resultMes.toFixed(2);
    });

    username.addEventListener('input', checkInputUsername);
    email.addEventListener('input', checkInputEmail);
    mobile.addEventListener('input', (event) => {
        formatPhone(event);
        checkInputMobile();
    });
    energia.addEventListener('input', checkInputEnergia);

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
        const emailValue = email.value.trim();

        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|cn|net)$/;

        if (emailValue === "") {
            errorInput(email, "Informe um E-mail válido!");
        } else if (!emailPattern.test(emailValue)) {
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

        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const mobileValue = mobile.value.trim();
        const energiaValue = energia.value.trim();

        if (usernameValue === "" || emailValue === "" || mobileValue === "" || energiaValue === "") {
            alert("PREENCHA TODOS OS CAMPOS PARA REALIZAR O SUBMIT!");
            return false;
        }

        console.log("username: " + username.value);
        console.log("email: " + email.value);
        console.log("phone: " + mobile.value);
        console.log("energia: " + energia.value);
        form.reset();
        alert("TUDO SAFE MEU PATRAO");
        return true;
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
