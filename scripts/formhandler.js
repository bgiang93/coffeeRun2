(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    // Creates an array to store emails in a more global scope
    App.emails = [];

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        // This creates variable, formElement, that selects the entire form
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        $('#strengthLevel').on('input', function() {
            var slide_value = $(this).val();

            if (slide_value < 60) {
                $('#strengthValue').text(slide_value);
                $('#strengthValue').css('color', 'green');
                // $('#strengthLevel').value = slide_value;
            } else if (slide_value > 50 && slide_value < 70) {
                $('#strengthValue').text(slide_value);
                $('#strengthValue').css('color', 'yellow');
                // $('#strengthLevel').value = slide_value;
            } else if (slide_value > 80) {
                $('#strengthValue').text(slide_value);
                $('#strengthValue').css('color', 'red');
                // $('#strengthLevel').value = slide_value;
            }
        });
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');

        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();

            var level = data['strength'];
            var size = data['size'];
            var flavor = data['flavor'];
            App.emails = data['emailAddress'];
            if (level == 100 && size == 'coffee-zilla' && flavor != '') {
                console.log('Woahh there Speedy Gonzales');
                console.log('Achievement Unlocked!');
                $('#myModal').modal('show');
            }
        });

        // Gold Challenge
        $(document).on('click', '#selectYes', function() {
            console.log('This works!');
            $('#myModal').modal('hide');

            var email = App.emails;
            // Check to see if the email is there
            if (email != '') {
                console.log('Email is here!!');
                // Unfinished
            }
            console.log(email);
        });


    };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
