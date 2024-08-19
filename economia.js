document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const mobile = document.getElementById("mobile");

  form.addEventListener("submit", (event) => {
      event.preventDefault();
      checkForm();
  });

  // Formatar o número de telefone em tempo real
  mobile.addEventListener('input', formatPhone);

  function formatPhone(event) {
      let value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

      if (value.length > 2) {
          value = value.replace(/^(\d{2})(\d)/g, '$1 $2'); // Adiciona espaço após o DDD
      }
      if (value.length > 7) {
          value = value.replace(/(\d{5})(\d{1,4})$/, '$1-$2'); // Adiciona hífen
      }

      event.target.value = value; // Atualiza o campo de entrada
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
      } else {
          const formItem = email.parentElement;
          formItem.className = "form-content";
      }
  }

  function checkInputMobile() {
      const mobileValue = mobile.value;

      if (mobileValue.length < 14) { // Considera o comprimento do formato DD 99999-9999
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
      }
  }

  function errorInput(input, message) {
      const formItem = input.parentElement;
      const textMessage = formItem.querySelector("a");

      textMessage.innerText = message;
      formItem.className = "form-content error";
  }
});
