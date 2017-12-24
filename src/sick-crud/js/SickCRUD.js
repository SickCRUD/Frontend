$(function() {

    // AFTER DOM READY
    $('input[type=checkbox], input[type=radio]').iCheck({

        checkboxClass: 'icheckbox_square-blue'

    });

    // Hide show-password
    $('input[type=password]').each(function (index) {

        var $currentField = $(this),
            $currentFieldBackgroundSize,
            $currentFiledSpaceRightSize;

        $currentField.hideShowPassword({
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

        // fix last-pass like services
        setTimeout(function() {
            $currentFieldBackgroundSize = $currentField.css('background-size').split(' ');
            $currentFiledPaddingRightSize = 0;
            for(var $currentFieldSide in $currentFieldBackgroundSize){
                // if width or height is set
                if($currentFieldBackgroundSize[$currentFieldSide]) {
                    var $currentBackgroundSize = parseInt($currentFieldBackgroundSize[$currentFieldSide].slice(0, -2));
                    // 35px as a threshold should be enough ?
                    if($currentBackgroundSize < 35 && $currentBackgroundSize > $currentFiledSpaceRightSize) {
                        $currentFiledSpaceRightSize = $currentBackgroundSize + 5;
                    }
                }
            }
            $currentField.parent('.hideShowPassword-wrapper').find('button[type=button]').css('right', $currentFiledSpaceRightSize + 'px');
        }, 500);

    });

});
