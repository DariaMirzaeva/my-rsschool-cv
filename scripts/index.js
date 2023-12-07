const Common = {
    init() {
        this.events();
        this.methods.showInfo();
        this.methods.initSliders();
    },
    events() {
        addEventListener('click', this.methods.profileMenuButtonHandler);
        addEventListener('click', this.methods.menuButtonHandler);
        addEventListener('click', this.methods.changeFavoritesItems);
        addEventListener('click', this.methods.modalVisibility);
    },
    methods: {
        showInfo() {
            console.log(`
1. Вёрстка соответствует макету. Ширина экрана 768px +26;
2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12;
3. На ширине экрана 768рх реализовано адаптивное меню +12;  
`.trim());
        },
        profileMenuButtonHandler(event) {
            const {target} = event;
            const profile = document.querySelector('[data-menu="profile"]');

            event.stopPropagation();

            if (!target.classList.contains('profile__icon') && !target.classList.contains('profile__menu')) {
                profile.classList.remove('active');

                return;
            }

            if (target.classList.contains('profile__menu') && profile.classList.contains('active')) return;

            profile.classList.toggle('active');
        },
        menuButtonHandler(event) {
            const {target} = event;

            event.stopPropagation();

            if (!target.classList.contains('menu-button') && !target.classList.contains('nav')
                || (target.classList.contains('menu-button') && target.classList.contains('active'))) {
                Common.methods.navClose();

                return;
            }

            target.classList.add('active');
            Common.methods.navOpen();
        },
        navOpen() {
            const nav = document.querySelector('[data-nav="nav"]');

            nav.classList.add('open');
        },

        navClose() {
            const menuButton = document.querySelector('[data-menu="menu-button"]');
            const nav = document.querySelector('[data-nav="nav"]');

            Common.methods.removeClassOnElement(menuButton, 'active');
            Common.methods.removeClassOnElement(nav, 'open');
        },
        removeClassOnElement(element, className) {
            element.classList.remove(className);
        },
        removeClassOnElement(element, className) {
            element.classList.remove(className);
        },
        initSliders() {
            Common.methods.aboutSlider();
        },
        aboutSlider() {
            const swiper = new Swiper('[data-slider="abuot"]', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    320: {
                        spaceBetween: 0,
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        navigation: {
                            nextEl: '.slider__navigation-btn_next',
                            prevEl: '.slider__navigation-btn_prev',
                        },
                    },
                    992: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 25,
                    },
                },
            });
        },
        changeFavoritesItems(event) {
            event.stopPropagation();

            const radio = event.target.dataset.favorites;

            if (radio) {
                const group = document.querySelector(`[data-group="${radio}"]`);
                const sibs = Common.methods.getAllSiblings(group);

                for (element of sibs) {
                    if (element !== group) {
                        Common.methods.fade(element);
                    }
                }

                setTimeout(() => {
                    Common.methods.unfade(group);
                });
            }
        },
        fade(element) {
            if (!element) return;

            let op = 1;
            element.style.display = 'none';

            const timer = setInterval(() => {
                if (op <= 0.1) {
                    clearInterval(timer);
                }
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ')';
                op -= op * 0.1;
            }, 10);
        },
        unfade(element) {
            if (!element) return;

            let op = 0.1;

            element.style.display = 'block';

            const timer = setInterval(() => {
                if (op >= 1) {
                    clearInterval(timer);
                }

                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ')';
                op += op * 0.1;
            }, 15);
        },
        getAllSiblings(element, filter) {
            if (!element) return;

            const sibs = [];

            element = element.parentNode.firstChild;

            do {
                if (element.nodeType === 3) continue; // text node
                if (!filter || filter(element)) sibs.push(element);
            } while (element = element.nextSibling);

            return sibs;
        },
        modalVisibility(event) {
            const body = document.querySelector('body');
            const overlay = document.querySelector('[data-modal="overlay"]');
            let content = '';

            if (event.target.dataset.modal === 'open') {
                body.style.width = document.body.clientWidth + 'px';
                body.style.overflow = 'hidden';
                overlay.classList.add('active');

                content = event.target.dataset.content;

                document.querySelector(`[data-modal="overlay"] [data-content="${content}"]`)
                    .classList.add('active');
            }

            if (event.target.dataset.modal === 'reopen') {
                content = event.target.dataset.reopenContent;

                Common.methods.closeActiveModals();

                document.querySelector(`[data-modal="overlay"] [data-content="${content}"]`)
                    .classList.add('active');
            }

            if (event.target.dataset.modal === 'close') {
                body.style.overflow = '';
                body.style.width = '';
                overlay.classList.remove('active');

                Common.methods.closeActiveModals();
            }
        },
        closeActiveModals() {
            document.querySelectorAll(`[data-modal="overlay"] [data-content]`)
                .forEach((element) => element.classList.remove('active'));
        }
    },
};

Common.init();
