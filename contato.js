/* =========================================================
   Formulário de contato (Contato.html)
   Depende de forms.js (FormUtils).
   Aceita ?assunto=cooperado|parceiro|fatura|outro na URL para
   pré-selecionar o assunto (usado pelos CTAs das outras páginas).
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contato');
    if (!form) return;

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');
    const status = document.getElementById('contato-status');

    const { rules, bindValidation, formatPhone, showStatus } = FormUtils;

    // Pré-seleciona o assunto vindo da URL
    const assuntoUrl = new URLSearchParams(window.location.search).get('assunto');
    if (assuntoUrl && assunto.querySelector(`option[value="${CSS.escape(assuntoUrl)}"]`)) {
        assunto.value = assuntoUrl;
    }

    const validateAll = bindValidation([
        { input: nome, validate: rules.name },
        { input: email, validate: rules.email },
        { input: telefone, validate: rules.optionalPhone },
        { input: assunto, validate: rules.required('o assunto') },
        {
            input: mensagem,
            validate: (value) => {
                if (value.trim() === '') return 'Escreva sua mensagem.';
                if (value.trim().length < 10) return 'Conte um pouco mais (mínimo de 10 caracteres).';
                return '';
            },
        },
    ]);

    telefone.addEventListener('input', () => {
        telefone.value = formatPhone(telefone.value);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateAll()) {
            showStatus(status, 'Revise os campos destacados para continuar.', 'error');
            return;
        }

        // Sem back-end: aqui entraria o envio da mensagem (serviço de e-mail ou API).
        showStatus(status, 'Mensagem enviada! Responderemos o mais breve possível.');
        form.reset();
    });
});
