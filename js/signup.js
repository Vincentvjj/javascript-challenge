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


});

