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

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    // Animation
    const animation = () => {
        const popupContent = document.querySelector('.popup-content');
        let count = -40;

        popupContent.style.left = '-40%';

        const animationPopup = () => {
            if (count < 20) {
                count++;
                popupContent.style.left = count * 2 + '%';
            } else {
                clearInterval(idInterval);
            }

        };
        let idInterval = setInterval(animationPopup, 10);

    };

    // data-toggle
    const toggleImg = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');

        commandPhoto.forEach((elem) => elem.addEventListener('mouseover', () => {
            event.target.src = event.target.dataset.img;
        }));

        // commandPhoto.forEach((elem) => elem.addEventListener('mouseout', () => {
        //     let res = event.target.src.replace(/a/, '');

        //     console.log(res);

        // }));
    };
    toggleImg();

    // Валидация
    const validation = () => {
        const calcBlock = document.querySelector('.calc-block'),
            input = calcBlock.querySelectorAll('input');

        const formPhone = document.querySelectorAll('.form-phone');

        const regVal = (target) => {
            let reg = /\D/g;

            if (reg.test(target.value)) {
                target.value = target.value.replace(reg, '');
            }
        };

        input.forEach((elem) => elem.addEventListener('input', () => {
            let target = event.target;
            regVal(target);
        }));
        formPhone.forEach((elem) => elem.addEventListener('input', () => {
            let target = event.target;
            regVal(target);
        }));

        const formName = document.querySelectorAll('.form-name');
        formName.forEach((elem) => elem.addEventListener('input', () => {
            let target = event.target;
            let reg = /\d/g;

            if (reg.test(target.value)) {
                target.value = target.value.replace(reg, '');
            }
        }));

    };
    validation();

    // Калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('.calc-type') || target.matches('.calc-square') ||
                target.matches('.calc-count') || target.matches('.calc-day')) {
                countSum();
            }
        });

    };
    calc(100);

    // send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.querySelectorAll('form');
        const statusMessage = document.createElement('div');

        form.forEach((elem) => {
            elem.addEventListener('submit', (event) => {
                event.preventDefault();
                elem.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(elem);
                let body = {};

                for (let val of formData.entries()) {
                    body[val[0]] = val[1];
                }

                postData(body, () => {
                    statusMessage.textContent = successMessage;
                }, (error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

                elem.reset();
            });
        });

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {

                if (request.readyState !== 4) {
                    return;

                }

                if (request.readyState !== 200) {
                    outputData();

                } else {
                    errorData(request.status);

                }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };

    };
    sendForm();
});