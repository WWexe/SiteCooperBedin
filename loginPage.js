/* =========================================================
   Área do Cooperado (loginPage.html)
   Versão visual, sem autenticação real. Depende de forms.js.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login');
    if (!form) return;

    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const toggleSenha = document.getElementById('toggle-senha');
    const status = document.getElementById('login-status');

    const { rules, bindValidation, showStatus } = FormUtils;

    const validateAll = bindValidation([
        { input: email, validate: rules.email },
        { input: senha, validate: rules.required('sua senha') },
    ]);

    // Mostrar/ocultar senha
    toggleSenha.addEventListener('click', () => {
        const visivel = toggleSenha.getAttribute('aria-pressed') === 'true';
        senha.type = visivel ? 'password' : 'text';
        toggleSenha.setAttribute('aria-pressed', String(!visivel));
        toggleSenha.textContent = visivel ? 'Mostrar' : 'Ocultar';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateAll()) {
            showStatus(status, 'Revise os campos destacados para continuar.', 'error');
            return;
        }

        // Sem back-end: a autenticação real ainda não existe.
        showStatus(
            status,
            'A Área do Cooperado está em desenvolvimento. Em breve você poderá acompanhar seus créditos por aqui.'
        );
    });
});
