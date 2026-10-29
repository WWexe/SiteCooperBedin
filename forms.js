/* =========================================================
   Utilitários de formulário compartilhados
   (usados por economia.js, contato.js e loginPage.js)

   Expõe um único objeto global, FormUtils, para que os scripts
   de cada página reaproveitem a mesma validação e formatação.
   ========================================================= */
const FormUtils = (() => {
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // aceita .com.br, .org etc.

    /** Mostra/limpa a mensagem de erro de um campo. */
    function setError(input, message) {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (message) {
            input.setAttribute('aria-invalid', 'true');
        } else {
            input.removeAttribute('aria-invalid');
        }
        if (errorEl) errorEl.textContent = message || '';
    }

    /** Converte "R$ 1.234,56", "150,5" ou "150.5" em número. */
    function parseCurrency(text) {
        let value = String(text).replace(/[^\d,.-]/g, '');
        if (value.includes(',')) {
            value = value.replace(/\./g, '').replace(',', '.');
        }
        const number = parseFloat(value);
        return Number.isFinite(number) ? number : NaN;
    }

    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    function formatCurrency(number) {
        return currencyFormatter.format(number);
    }

    /** Máscara de celular no formato "DD 99999-9999" (ou "DD 9999-9999"). */
    function formatPhone(text) {
        const digits = text.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 2) return digits;

        const ddd = digits.slice(0, 2);
        const rest = digits.slice(2);
        if (rest.length <= 4) return `${ddd} ${rest}`;

        const split = rest.length === 9 ? 5 : 4;
        return `${ddd} ${rest.slice(0, split)}-${rest.slice(split)}`;
    }

    // Regras reutilizáveis: cada uma devolve a mensagem de erro ou ''.
    const rules = {
        required: (label) => (value) =>
            value.trim() === '' ? `Informe ${label}.` : '',
        name: (value) => {
            if (value.trim() === '') return 'Informe seu nome.';
            if (value.trim().length < 3) return 'O nome precisa ter pelo menos 3 letras.';
            return '';
        },
        email: (value) => {
            if (value.trim() === '') return 'Informe seu e-mail.';
            if (!EMAIL_PATTERN.test(value.trim())) return 'Informe um e-mail válido, como nome@exemplo.com.br.';
            return '';
        },
        phone: (value) => {
            const digits = value.replace(/\D/g, '');
            if (digits === '') return 'Informe seu celular.';
            if (digits.length < 10) return 'Informe o DDD e o número completo.';
            return '';
        },
        optionalPhone: (value) =>
            value.trim() === '' ? '' : rules.phone(value),
    };

    /**
     * Liga a validação a um formulário.
     * fields: [{ input: HTMLElement, validate: (value) => string }]
     * Valida ao sair do campo e, depois do primeiro erro, a cada digitação.
     * Retorna uma função que valida tudo e foca o primeiro campo inválido.
     */
    function bindValidation(fields) {
        fields.forEach(({ input, validate }) => {
            input.addEventListener('blur', () => {
                setError(input, validate(input.value));
            });
            input.addEventListener('input', () => {
                if (input.getAttribute('aria-invalid') === 'true') {
                    setError(input, validate(input.value));
                }
            });
        });

        return function validateAll() {
            let firstInvalid = null;
            fields.forEach(({ input, validate }) => {
                const message = validate(input.value);
                setError(input, message);
                if (message && !firstInvalid) firstInvalid = input;
            });
            if (firstInvalid) firstInvalid.focus();
            return firstInvalid === null;
        };
    }

    /** Exibe uma mensagem de status (sucesso/erro) na região aria-live. */
    function showStatus(element, message, type = 'success') {
        element.className = `form-status form-status--${type}`;
        element.textContent = message;
    }

    return {
        rules,
        bindValidation,
        setError,
        parseCurrency,
        formatCurrency,
        formatPhone,
        showStatus,
    };
})();
