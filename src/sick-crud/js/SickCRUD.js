$(function() {

    // AFTER DOM READY
    $('input[type=checkbox], input[type=radio]').iCheck({

        checkboxClass: 'icheckbox_square-blue'

    });

    // Hide show-password
    $('input[type=password]').each(function (index) {

        $(this).hideShowPassword({
            show: false,
            innerToggle: 'focus',
            toggle: {
                className: 'text-toggle',
            },
            states: {
                shown: {
                    toggle: {
                        content: $(this).attr('data-hide') || 'Hide',
                    }
                },
                hidden: {
                    toggle: {
                        content: $(this).attr('data-show') || 'Show',
                    }
                }
            }
        });

    });

});
