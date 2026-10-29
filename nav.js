/* =========================================================
   Menu hambúrguer acessível (substitui o antigo mobileNav.js)
   - alterna a classe .is-open no <nav>
   - mantém aria-expanded e aria-label do botão em sincronia
   - fecha com Esc, ao clicar em um link ou ao voltar para o desktop
   ========================================================= */
(() => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('menu-principal');

    if (!toggle || !nav) return;

    const icon = toggle.querySelector('img');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const ICON_OPEN = 'Images/menu_white_36dp.svg';
    const ICON_CLOSE = 'Images/close_white_36dp.svg';

    function setMenu(open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        if (icon) icon.src = open ? ICON_CLOSE : ICON_OPEN;
    }

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        setMenu(!isOpen);
    });

    // Esc fecha o menu e devolve o foco ao botão
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
            setMenu(false);
            toggle.focus();
        }
    });

    // Clicar em um link do menu fecha o painel (útil para âncoras)
    nav.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenu(false);
    });

    // Ao redimensionar para desktop, garante o estado fechado no mobile
    desktopQuery.addEventListener('change', (event) => {
        if (event.matches) setMenu(false);
    });
})();
