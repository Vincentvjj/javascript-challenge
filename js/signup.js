/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";



document.addEventListener('DOMContentLoaded', function() {

    var form = document.getElementById('signup');
    var option;
    var stateSelect = form.elements["state"];

    for(var i = 0; i < usStates.length; i++) {
        option = document.createElement('option');
        option.innerHTML = usStates[i].name;
        option.value = usStates[i].code;

        stateSelect.appendChild(option);
    }


    var occupationSelect = document.getElementById('occupation');

    occupationSelect.addEventListener('change', function() {
        if(occupationSelect.value == 'other') {
            document.getElementsByName('occupationOther')[0].style.display = "block";
        }
    });

    var noThanksButton = document.getElementById('cancelButton');
    noThanksButton.addEventListener('click', function() {
        if(window.confirm('Are u sure?')) {
            window.location = 'http://www.google.com';
        }
    });



    form.addEventListener('submit', onSubmit);

});



function onSubmit(evt) {
    evt.returnValue = validateForm(this);
    if (evt.returnValue == false && evt.preventDefault) {
        evt.preventDefault();
    }

    return evt.returnValue;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'zip', 'birthdate'];
    var formValid = true; 
    var occupationSelect = document.getElementById('occupation');
    var occupationOther = document.getElementsByName('occupationOther')[0];
    var zipRegEx = new RegExp('^\\D+$'); // change the regular expression

    if(occupationSelect.value == 'other' && occupationOther.value.trim() == '') {
        formValid = false;
        occupationOther.className = "form-control invalid-field";
    }

    if(!zipRegEx.test) // test it with zip code's vlock

    for(var i = 0; i < requiredFields.length; i++) {
        formValid &= validateRequiredField(form.elements[requiredFields[i]]);
    }

    



    if(!formValid) {
       alert();
    }

    return formValid;
}


function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;

    if(!valid) {
        field.className = 'form-control invalid-field';
    }

    else {
        field.className = 'form-control';
    }

    return valid;

}

    




