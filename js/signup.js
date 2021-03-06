/*
    Author: Vincent Jonany
    Challege: Javascript Challenge
    Date: 10/22/14
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', function() {

    var form = document.getElementById('signup');
    var option;
    var stateSelect = form.elements["state"];

    for (var i = 0; i < usStates.length; i++) {
        option = document.createElement('option');
        option.innerHTML = usStates[i].name;
        option.value = usStates[i].code;
        stateSelect.appendChild(option);
    }

    var occupationSelect = document.getElementById('occupation');

    //When going back to the signup page, the occupationOther box will still be there
    if (occupationSelect.value == 'other') {
        document.getElementsByName('occupationOther')[0].style.display = 'block';
    }

    occupationSelect.addEventListener('change', function() {
        if (occupationSelect.value == 'other') {
            document.getElementsByName('occupationOther')[0].style.display = 'block';
        }

        else {
            document.getElementsByName('occupationOther')[0].style.display = 'none';
        }
    });

    var noThanksButton = document.getElementById('cancelButton');
    noThanksButton.addEventListener('click', function() {
        if (window.confirm('Are u sure?')) {
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
    try {
        var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
        var formValid = true; 
        var occupationSelect = document.getElementById('occupation');
        var occupationOther = document.getElementsByName('occupationOther')[0];
        var zipRegEx = new RegExp('^\\d{5}$'); 
        var zip = document.getElementsByName('zip')[0];
        var birthdate = document.getElementById('birthdate').value;
        birthdate = new Date(birthdate);
        var today = new Date();
        var yearsDiff = today.getFullYear() - birthdate.getUTCFullYear();
        var monthsDiff = today.getMonth() - birthdate.getUTCMonth();
        var daysDiff = today.getDate() - birthdate.getUTCDate(); 


        for (var i = 0; i < requiredFields.length; i++) {
            formValid &= validateRequiredField(form.elements[requiredFields[i]]);
        }

        if (occupationSelect.value == 'other' && occupationOther.value.trim() == '') {
            formValid = false;
            occupationOther.className = 'form-control invalid-field';
        }
        else {
            occupationOther.className = 'form-control';
        }

        if (!zipRegEx.test(zip.value)) {
            formValid = false; 
            zip.className = 'form-control invalid-field';
            document.getElementById('zipMessage').innerHTML = 'Please enter a valid ZIP code';
            //Shows feedback to users
        }

        else {
            document.getElementById('zipMessage').style.display = 'none';
        }

        if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
            --yearsDiff;
        }

        if (yearsDiff < 13) {
            document.getElementById('birthdateMessage').innerHTML = 'You need to be AT LEAST 13-years-old to sign up!';
            formValid = false;
            document.getElementById('birthdate').className = 'form-control invalid-field';
        }

        else if (yearsDiff >= 13) {
            document.getElementById('birthdateMessage').style.display = 'none';
        }

        return formValid;
    }

    catch(exception) {
        alert(exception);
    }
}

//Check if the field is empty
function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;

    if (!valid) {
        field.className = 'form-control invalid-field';
    }

    else {
        field.className = 'form-control';
    }

    return valid;
}

    
