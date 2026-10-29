/* =========================================================
   Simulador de economia (Economia.html)
   Regra: economia de 15% (bandeira verde) a 25% (bandeira de
   escassez hídrica) sobre o valor mensal da conta de luz.
   Anual = mensal × 12. Depende de forms.js (FormUtils).
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const DESCONTO_MIN = 0.15; // bandeira verde
    const DESCONTO_MAX = 0.25; // bandeira de escassez hídrica

    const form = document.getElementById('form-simulador');
    if (!form) return;

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const celular = document.getElementById('celular');
    const conta = document.getElementById('conta');
    const resultadoMes = document.getElementById('resultado-mes');
    const resultadoAno = document.getElementById('resultado-ano');
    const status = document.getElementById('simulador-status');

    const { rules, bindValidation, parseCurrency, formatCurrency, formatPhone, showStatus } = FormUtils;

    function validateConta(value) {
        if (value.trim() === '') return 'Informe o valor da sua conta de luz.';
        const number = parseCurrency(value);
        if (Number.isNaN(number) || number <= 0) return 'Informe um valor em reais, como 250,00.';
        return '';
    }

    const validateAll = bindValidation([
        { input: nome, validate: rules.name },
        { input: email, validate: rules.email },
        { input: celular, validate: rules.phone },
        { input: conta, validate: validateConta },
    ]);

    /** Atualiza a faixa de economia enquanto o usuário digita. */
    function updateResult() {
        const valor = parseCurrency(conta.value);
        if (Number.isNaN(valor) || valor <= 0) {
            resultadoMes.textContent = '—';
            resultadoAno.textContent = '—';
            return;
        }
        const mesMin = valor * DESCONTO_MIN;
        const mesMax = valor * DESCONTO_MAX;
        resultadoMes.textContent = `${formatCurrency(mesMin)} a ${formatCurrency(mesMax)}`;
        resultadoAno.textContent = `${formatCurrency(mesMin * 12)} a ${formatCurrency(mesMax * 12)}`;
    }

    conta.addEventListener('input', updateResult);

    celular.addEventListener('input', () => {
        celular.value = formatPhone(celular.value);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateAll()) {
            showStatus(status, 'Revise os campos destacados para continuar.', 'error');
            return;
        }

        // Sem back-end: aqui entraria o envio dos dados (fetch para uma API, por exemplo).
        const primeiroNome = nome.value.trim().split(' ')[0];
        showStatus(
            status,
            `Obrigado, ${primeiroNome}! Recebemos sua simulação e nossa equipe vai entrar em contato em breve.`
        );
        form.reset();
        updateResult();
    });
});
