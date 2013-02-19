var speedScroll = 500;  // скорость прокрутки

(function($) {

    $(document).ready(function() {

        if (getBrowser()[0] == 'Opera' || getBrowser()[0] == 'Safari' || getBrowser()[0] == 'Chrome') {
            $('head').append('<link rel="stylesheet" href="css/style-add.css" type="text/css" />');
        }

        $('.main-col-rubric-link').click(function() {
            var curBlock = $(this).parent();
            if (curBlock.hasClass('main-col-rubric-open')) {
                curBlock.removeClass('main-col-rubric-open');
            } else {
                $('.main-col-rubric-open').removeClass('main-col-rubric-open');
                curBlock.addClass('main-col-rubric-open');
            }
        });

        $(document).click(function(e) {
            if ($(e.target).parents().filter('.main-col-rubric').length == 0) {
                $('.main-col-rubric-open').removeClass('main-col-rubric-open');
            }
        });

        $('.content .main-top-item:odd').addClass('main-top-item-odd');

        $('.main-top-tabs ul li a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.main-top-tabs ul li').index(curLi);
                $('.main-top-tabs ul li').removeClass('active');
                $('.main-top-tabs ul li').eq(curIndex).addClass('active');
                $('.main-top-container .main-top').hide();
                $('.main-top-container .main-top').eq(curIndex).slideDown();
            }
            return false;
        });

        $('.partners-content').each(function() {
            $('.partners-content').data('enableMove', false);
        });

        $('.partners-content').mouseover(function(e) {
            var curSlider = $(this);
            var curWidthWindow = curSlider.width();
            var curWidthPartners = curSlider.find('ul').width();
            if (!curSlider.data('enableMove')) {
                if (curWidthPartners > curWidthWindow) {
                    if ((0 < e.pageX) && (e.pageX < (curWidthWindow / 3))) {
                        $('.partners-content').data('enableMove', true);
                        partnersPrev();
                    } else if (((curWidthWindow / 3 * 2) < e.pageX) && (e.pageX < curWidthWindow)) {
                        $('.partners-content').data('enableMove', true);
                        partnersNext();
                    }
                }
            }
        });

        $('.partners-content').mouseout(function() {
            $('.partners-content').data('enableMove', false);
        });

        $('.masterclass-menu a').click(function() {
            $.scrollTo($(this).attr('href'), {duration: speedScroll});
            return false;
        });
        
        $('.calendar-descr-photos').each(function() {
            $('.calendar-descr-photos a').fancybox();
        });
        
        $('.calendar-list-item:even').addClass('calendar-list-item-even');

    });

    function partnersPrev() {
        var curSlider = $('.partners-content');
        if (curSlider.data('enableMove')) {
            var curWidthWindow = curSlider.width();
            var curWidthPartners = curSlider.find('ul').width();
            if (curWidthPartners > curWidthWindow) {
                var curLeft = curSlider.data('curLeft');
                curLeft -= 1;
                if (curLeft <= 0) {
                    curLeft = 0;
                }
                curSlider.data('curLeft', curLeft);
                curSlider.find('ul').css({'left': -curLeft});
                window.setTimeout(partnersPrev, 10);
            }
        }
    }

    function partnersNext() {
        var curSlider = $('.partners-content');
        if (curSlider.data('enableMove')) {
            var curWidthWindow = curSlider.width();
            var curWidthPartners = curSlider.find('ul').width();
            if (curWidthPartners > curWidthWindow) {
                var curLeft = curSlider.data('curLeft');
                curLeft += 1;
                if (curWidthWindow >= (curWidthPartners - curLeft)) {
                    curLeft = curWidthPartners - curWidthWindow;
                }
                curSlider.data('curLeft', curLeft);
                curSlider.find('ul').css({'left': -curLeft});
                window.setTimeout(partnersNext, 10);
            }
        }
    }

    $(window).load(function() {
        window.setInterval(function() {
            $('.side-block .dsq-widget-item').eq(5).css({'background-image': 'none'});
            $('.side-block .dsq-widget-item').each(function() {
                var curItem = $(this);
                curItem.height(curItem.find('.dsq-widget-comment').height() + 56 + 19);
            });
        }, 1000);

        $('.partners-content').each(function() {
            var curSlider = $(this);
            var curWidth = 0;
            curSlider.find('li').each(function() {
                curWidth += $(this).width() + 24;
            });
            curSlider.find('ul').width(curWidth);
            curSlider.data('curLeft', 0);
            curSlider.data('enableMove', false)
        });

    });

    $(window).scroll(function() {
        if ($('.masterclass-menu').length != 0) {
            var curScroll = $(window).scrollTop();
            $('.masterclass-menu .active').removeClass('active');
            var curLink  = null;
            $('.masterclass-menu-inner a').each(function() {
                if (curScroll >= $($(this).attr('href')).offset().top - 10) {
                    curLink = $(this);
                }
            });
            if (curLink != null) {
                curLink.addClass('active');
            }
            if (curScroll > $('.masterclass-menu').offset().top) {
                if (curScroll > ($('.masterclass').height() + $('.masterclass').offset().top - $('.masterclass-menu-inner').height())) {
                    $('.masterclass-menu-inner').removeClass('masterclass-menu-inner-fix').css({'left': 'auto', 'top': $('.masterclass-content').height() - $('.masterclass-menu-inner').height()});
                } else {
                    $('.masterclass-menu-inner').addClass('masterclass-menu-inner-fix').css({'left': $('.masterclass-menu').offset().left, 'top': '0'});
                }
            } else {
                $('.masterclass-menu-inner').removeClass('masterclass-menu-inner-fix').css({'left': 'auto', 'top': '0'});
            }
        }
    });

})(jQuery);