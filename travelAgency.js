



//  Event Listeners Function

eventListeners();

function eventListeners() {

    const ui = new UI();

    // Hide Preloader

    window.addEventListener('load', function () {

        ui.hidePreloader();

    });

    // Navigation Button

    document.querySelector('.navBtn').addEventListener('click', function () {

        ui.showNavigation();

    });


    //   Submit Form

    document.querySelector('.discount-form').addEventListener('submit', function (event) {

        event.preventDefault();

        const name = document.querySelector('.input-name').value;
        const lastName = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastName, email);

        if (value) {

            let customer = new Customer(name, lastName, email);

            ui.addCustomer(customer);

            ui.showFeedback('Customer Added Tto The LIst', 'success');

            ui.clearFields();

        } else {

            ui.showFeedback('Some Form Values Are Empty', 'error');
        }
    });


    //  Display Modal


    const links = document.querySelectorAll('.work-item__icon');

    links.forEach(function (item) {

        item.addEventListener('click', function (event) {

            ui.showModal(event);

        })

    });

    //  Hide Modal

    document.querySelector('.work-modal__close').addEventListener('click', function(){

        ui.closeModal();

    })

}


function UI() {

}

//  Hide Preloader

UI.prototype.hidePreloader = function () {

    document.querySelector('.preloader').style.display = 'none';

}

//  Show Item

UI.prototype.showNavigation = function () {

    document.querySelector('.nav').classList.toggle('nav--show');

}

//  Check For Empty Values


UI.prototype.checkEmpty = function (name, lastName, email) {

    let result;

    if (name === '' || lastName === '' || email === '') {

        result = false;

    } else {

        result = true;
    }

    return result;

}

//  Show Feedback

UI.prototype.showFeedback = function (text, type) {

    const feedBack = document.querySelector('.discount-form__feedback');

    if (type === 'success') {

        feedBack.classList.add('success');

        feedBack.innerText = text;

        this.removeAlert('success');


    } else if (type === 'error') {

        feedBack.classList.add('error');

        feedBack.innerText = text;

        this.removeAlert('error');
    }
}


//  Remove Alert

UI.prototype.removeAlert = function (type) {

    setTimeout(function () {

        document.querySelector('.discount-form__feedback').classList.remove(type);

    }, 3000)
}


//  Add Customer

UI.prototype.addCustomer = function (customer) {

    const images = [7, 8, 9, 10, 11];

    let random = Math.floor(Math.random() * images.length);

    const div = document.createElement('div');

    div.classList.add('person');

    div.innerHTML = `

<img src='images/customer-${random}.jpg' class='person__thumbnail'>
<h4 class="person__name">${customer.name}</h4>
<h4 class="person__last-name">${customer.lastName}</h4>

`
    document.querySelector('.discount-card__list').appendChild(div);

}


//  Clear Fields

UI.prototype.clearFields = function () {

    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';

}


//  Show Modal

UI.prototype.showModal = function (event) {

    event.preventDefault();

    if (event.target.parentElement.classList.contains('work-item__icon')) {

        let id = event.target.parentElement.dataset.id;

        const modal = document.querySelector('.work-modal');

        const modalItem = document.querySelector('.work-modal__item');

        modal.classList.add('work-modal--show');

        modalItem.style.backgroundImage = `url(images/travel-${id}.jpg)`;
    }
}


//  Close Modal

UI.prototype.closeModal = function(){

    document.querySelector('.work-modal').classList.remove('work-modal--show');
}


function Customer(name, lastName, email) {

    this.name = name,
        this.lastName = lastName,
        this.email = email;
}