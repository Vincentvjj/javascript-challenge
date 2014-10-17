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
            window.location.assign('http://google.com');
        }
    });

});


