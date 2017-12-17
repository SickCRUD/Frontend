$(function() {

    // AFTER DOM READY
    $('input[type=checkbox], input[type=radio]').iCheck({

        checkboxClass: 'icheckbox_square-blue'

    });

    // Internet Explorer FIX
    if($('html').hasClass('ie')){

        var loginRegisterForgotPasswordPage = $('.auth-page'),
            loginFormBoxWrapper = loginRegisterForgotPasswordPage.find('.form-box-wrapper').first(),
            loginFormBox = loginRegisterForgotPasswordPage.find('.form-box').first();

        loginFormBoxWrapper.css('min-height', loginFormBox.height() + 20);

    }

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
                        content: $(this).attr('data-show') || 'Hide',
                    }
                },
                hidden: {
                    toggle: {
                        content: $(this).attr('data-hide') || 'Show',
                    }
                }
            }
        });

    });

});
