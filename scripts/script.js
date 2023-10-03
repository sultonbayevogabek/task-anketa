'use strict';
document.addEventListener('DOMContentLoaded', () => {
    /*
        Set today to form filled out time date input
    */
    const timeInput = document.querySelector('#time');
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    timeInput.value = `${ year }-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;


    /*
        Calculate apartment price
    */
    const apartmentAreaSliderInput = document.querySelector('.range-input');
    const apartmentAreaNumberInput = document.querySelector('.apartment-area-input input');
    const apartmentPriceDisplayInput = document.querySelector('.form-field--price input');
    const calculatorOptions = document.querySelectorAll('.calculator-right .form-radio');
    let apartmentArea = 30;
    let tariff = 1500;
    let typeRenovation = 1;

    function calculateApartmentPrice() {
        apartmentPriceDisplayInput.value = Intl.NumberFormat('ru-RU', {
            style: 'decimal'
        }).format(Math.floor(tariff * apartmentArea / typeRenovation)) + ' руб.';
    }

    apartmentAreaSliderInput.addEventListener('input', function () {
        apartmentArea = this.value;
        apartmentAreaNumberInput.value = apartmentArea;
        calculateApartmentPrice();
    })

    apartmentAreaNumberInput.addEventListener('input', function () {
        apartmentArea = this.value;
        if (apartmentArea < 30) {
            apartmentArea = 30;
        }
        if (apartmentArea > 100) {
            apartmentArea = 100;
        }
        apartmentAreaSliderInput.value = apartmentArea;
        calculateApartmentPrice();
    })

    apartmentAreaNumberInput.addEventListener('blur', function () {
        apartmentAreaNumberInput.value = apartmentArea;
        calculateApartmentPrice();
    })

    calculatorOptions.forEach(option => {
        option.addEventListener('change', ({target}) => {
            if (target.getAttribute('name') === 'tariff') {
                tariff = target.value;
            } else {
                typeRenovation = target.value;
            }
            calculateApartmentPrice();
        })
    })

    /*
        About section
    */
    const aboutSection = document.querySelector('.about');
    const aboutInput = document.querySelector('#about-input');

    aboutInput.addEventListener('input', (e) => {
        if (e.target.clientWidth > aboutSection.clientWidth - 100) {
            if (!e.target.parentElement?.nextElementSibling?.classList.contains('about-input-wrapper')) {
                addNewInput(1);
                return;
            }
            document.querySelector(`div[data-index="1"]`).focus()
        }
    })

    aboutInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    })

    function addNewInput(index) {
        const aboutInputWrapper = document.createElement('div');
        aboutInputWrapper.classList.add('about-input-wrapper');

        const aboutInput = document.createElement('div');
        aboutInput.classList.add('about-input');
        aboutInput.setAttribute('contenteditable', 'true');
        aboutInput.setAttribute('data-index', index);

        aboutInputWrapper.append(aboutInput);
        aboutSection.append(aboutInputWrapper);

        aboutInput.focus();

        aboutInput.addEventListener('input', (e) => {
            const aboutInputs = document.querySelectorAll('.about-input');
            if (e.target.clientWidth > aboutSection.clientWidth - 100) {
                if (index === aboutInputs.length - 1) {
                    addNewInput(index + 1);
                    return;
                }
                document.querySelector(`div[data-index="${index + 1}"]`).focus()
            }
        })
        aboutInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                return;
            }
            const aboutInputs = document.querySelectorAll('.about-input');
            if (e.key === 'Backspace' && index === aboutInputs.length - 1 && e.target.textContent?.length === 0) {
                e.target.parentElement.remove();
                document.querySelector(`div[data-index="${index - 1}"]`).focus();
            }
        })
    }
})
