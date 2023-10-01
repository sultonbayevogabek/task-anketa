'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // Set today to form filled out time date input
    const timeInput = document.querySelector('#time');
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    timeInput.value = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;


    // Calculate apartment price
    const apartmentAreaSliderInput = document.querySelector('.range-input');
    const apartmentAreaNumberInput = document.querySelector('.apartment-area-input input');
    const apartmentPriceDisplayInput = document.querySelector('.form-field--price input');
    const calculatorOptions = document.querySelectorAll('.calculator-right .form-radio');
    let apartmentArea = 30;
    let tariff = 1500;
    let typeRenovation = 1;

    function calculateApartmentPrice() {
        apartmentPriceDisplayInput.value = Intl.NumberFormat('ru-RU', {style: 'decimal'})
            .format(Math.floor(tariff * apartmentArea / typeRenovation)) + ' руб.';
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

    // About section
    const aboutSection = document.querySelector('.about');
    function listenInputs() {
        const aboutInputs = document.querySelectorAll('.about-input');
        aboutInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.clientWidth > 1110) {
                    if (index === aboutInputs.length - 1) {
                        aboutSection.innerHTML += `
                            <div class="about-input-wrapper">
                                <div class="about-input" contenteditable="true" data-index="${index + 1}"></div>
                            </div>
                        `
                    }
                    document.querySelector(`div[data-index="${index + 1}"]`).focus()
                    listenInputs();
                }
            })

            input.addEventListener('keydown', e => {
                if (e.key === 'Backspace' && !e.target.value?.length && index !== 0) {
                    e.target.parentElement.remove();
                    document.querySelector(`div[data-index="${index - 1}"]`).focus()
                    listenInputs()
                }

                if (e.key === 'Enter') {
                    e.preventDefault();

                    if (index === aboutInputs.length - 1) {
                        aboutSection.innerHTML += `
                        <div class="about-input-wrapper">
                            <div class="about-input" contenteditable="true" data-index="${index + 1}"></div>
                        </div>
                    `
                        document.querySelector(`div[data-index="${index + 1}"]`).focus()
                        listenInputs()
                    }
                }
            })
        })
    }

    listenInputs();
})