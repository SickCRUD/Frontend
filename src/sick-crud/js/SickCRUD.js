$(function() {

    // AFTER DOM READY
    $('input[type=checkbox], input[type=radio]').iCheck({

        checkboxClass: 'icheckbox_square-blue'

    });

    // Internet Explorer FIX
    if($('html').hasClass('ie')){

        var loginRegisterForgotPasswordPage = $('.login-page, .register-page, .forgot-password-page'),
            loginFormBoxWrapper = loginRegisterForgotPasswordPage.find('.form-box-wrapper').first(),
            loginFormBox = loginRegisterForgotPasswordPage.find('.form-box').first();

        loginFormBoxWrapper.css('min-height', loginFormBox.height() + 20);

    }

});
