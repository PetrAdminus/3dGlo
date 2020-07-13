window.addEventListener('DOMContentLoaded', () => {
    'use sctrict';

    // Timer
    const timerGlo = setInterval(deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();
            if (timer.timeRemaining > 0) {
                if (timer.hours < 10) {
                    timerHours.textContent = '0' + timer.hours;
                } else {
                    timerHours.textContent = timer.hours;
                }
                if (timer.minutes < 10) {
                    timerMinutes.textContent = '0' + timer.minutes;
                } else {
                    timerMinutes.textContent = timer.minutes;
                }
                if (timer.seconds < 10) {
                    timerSeconds.textContent = '0' + timer.seconds;
                } else {
                    timerSeconds.textContent = timer.seconds;
                }
                setTimeout(updateClock, 1000);
            } else {
                timerHours.textContent = '0' + 0;
                timerMinutes.textContent = '0' + 0;
                timerSeconds.textContent = '0' + 0;
                clearInterval(timerGlo);
            }
        }
        updateClock();
    }, 1000, '2 july 2020');

    // Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItem.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    // Popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screen.width > 767) {
                    animation();
                }
            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopup();

    // Animation
    const animation = () => {
        const popupContent = document.querySelector('.popup-content');
        let count = -40;
        console.log(count);

        popupContent.style.left = '-40%';

        const animationPopup = () => {
            if (count < 20) {
                count++;
                popupContent.style.left = count * 2 + '%';
            } else {
                clearInterval(idInterval);
            }
            console.log(count);

        };
        let idInterval = setInterval(animationPopup, 10);

    };

    // data-toggle
    const toggleImg = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');

        commandPhoto.forEach((elem) => elem.addEventListener('mouseover', () => {
            event.target.src = event.target.dataset.img;
        }));

        commandPhoto.forEach((elem) => elem.addEventListener('mouseout', () => {
            let res = event.target.src.replace(/a/, '');

            console.log(res);

        }));
    };
    toggleImg();

    // Валидация
    const validation = () => {
        const calcBlock = document.querySelector('.calc-block'),
            input = calcBlock.querySelectorAll('input');

        input.forEach((elem) => elem.addEventListener('input', () => {
            let target = event.target;
            let reg = /\D/g;

            if (reg.test(target.value)) {
                target.value = target.value.replace(reg, '');
            }
        }));

    };
    validation();
});