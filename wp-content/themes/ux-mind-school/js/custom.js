jQuery(document).ready(function ($) {
    let dataCurrentPageValue = 1;
    let dataMaxPagesValue = $('.course-list__row:first-child').data('max-num-pages');
    $('.js-tabs__btn').on('click', function () {
        let dataValue = $(this).data('term-id');
		let ajaxData;
		if (typeof(dataValue) !== 'object'){
			ajaxData = {
				action: 'tabs',
				showTestPost: true,
                id: dataValue
			}
		}
		else{
			ajaxData = {
				action: 'tabs',
                id: dataValue
			}
		}
        dataCurrentPageValue = 1;
        $('.js-tabs__btn').removeClass('tabs__btn_active');
        $(this).addClass('tabs__btn_active');
        $.ajax({
            url: ajax.url,
            type: 'POST',
            data: ajaxData,
            beforeSend: function () {
                $('.course-list__wrapper').css('opacity', '.5');
            },
            success: function (response) {
                $('.course-list__wrapper').css('opacity', 1);
                $('.course-list__wrapper').html(response);
                dataMaxPagesValue = $('.course-list__row_first').data('max-num-pages');
                if (dataCurrentPageValue === dataMaxPagesValue) {
                    $('.course-list__more-btn').addClass('course-list__more-btn_disabled');
                } else {
                    $('.course-list__more-btn').removeClass('course-list__more-btn_disabled');
                }
            }
        });
    });
    $(document).on('click', '.course-list__more-btn', function () {
        $.ajax({
            url: ajax.url,
            type: 'POST',
            data: {
                action: 'courses',
                current_page: dataCurrentPageValue
            },
            beforeSend: function () {
                $('.course-list__wrapper').css('opacity', '.5');
            },
            success: function (response) {
                $('.course-list__wrapper').css('opacity', 1);
                $('.course-list__wrapper').append(response);
                dataCurrentPageValue += 1;
                if (dataCurrentPageValue === dataMaxPagesValue) {
                    $('.course-list__more-btn').addClass('course-list__more-btn_disabled');
                }
            }
        });
    });
    //Timetable select
    jQuery(document).on('change', 'select[name="timetable"]', function () {
        let selectedValue = jQuery(this).val();
        window.location.href = selectedValue;
        return;
    });
});
let inputTelElement = document.querySelectorAll('input[type="tel"]');
if (inputTelElement) {
    for (let item of inputTelElement) {
        let inputTelElementObject = new Inputmask("+375 (99) 999-99-99", {
            showMaskOnHover: false
        });
        inputTelElementObject.mask(item);
    }
}
// jQuery(document).on('click', '.portfolio-item, .course-gallery__img', function () {
//     let modalIdValue = jQuery(this).data('modal-id');
//     let fullImageSrc = jQuery(this).data('full-img');
//     if (modalIdValue && fullImageSrc) {
//         jQuery('.image-modal__media-item').attr('src', fullImageSrc).delay(150);
//         jQuery(modalIdValue).modal({
//             fadeDuration: 400
//         });
//         return;
//     }
// });

let portfolioCurrentPageNum = 1;
jQuery('.portfolio__btn_location-home').on('click', function () {
    let dataMaxPagesValue = jQuery(this).data('max-pages');
    jQuery.ajax({
        url: ajax.url,
        type: 'POST',
        data: {
            action: 'portfolio',
            currentPage: portfolioCurrentPageNum,
        },
        beforeSend: function () {
            jQuery('.portfolio').css('opacity', '.5');
        },
        success: function (response) {
            jQuery('.portfolio .row.no-gutters').append(response);
            portfolioCurrentPageNum += 1;
            if (portfolioCurrentPageNum === dataMaxPagesValue) {
                jQuery('.portfolio__btn').addClass('portfolio__btn_disabled');
            }
            jQuery('.portfolio').css('opacity', '1');
        }
    });
});

let postTagName = jQuery('.portfolio__btn_location-post').data('post-tag');
let postPortfolioMaxPages = jQuery('.portfolio__btn_location-post').data('max-page');
let postPortfolioPageNum = 1;
jQuery('.portfolio__btn_location-post').on('click', function () {
    jQuery.ajax({
        url: ajax.url,
        type: 'POST',
        data: {
            action: 'post_portfolio',
            tag: postTagName,
            currentPage: postPortfolioPageNum
        },
        beforeSend: function () {
            jQuery('.portfolio').css('opacity', '.5');
        },
        success: function (response) {
            jQuery('.portfolio .row.no-gutters').append(response);
            postPortfolioPageNum += 1;
            if (postPortfolioPageNum === postPortfolioMaxPages) {
                jQuery('.portfolio__btn').addClass('portfolio__btn_disabled');
            }
            jQuery('.portfolio').css('opacity', '1');
        }
    });
});

let clickedBool = false;
jQuery(document).on('click', '.content-list__more-btn', function () {
    if (clickedBool) {
        jQuery('html, body').animate({
            scrollTop: jQuery('.faq__title').offset().top - 50
        }, 150);
        jQuery('.faq__footer').html(`<button type="button" class="ajax-btn content-list__more-btn">Показать еще
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
        xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z"
        fill="#211130" />
</svg>
</button>`);
    } else {
        jQuery('.faq__footer').html(`<button type="button" class="ajax-btn content-list__more-btn content-list__more-btn_opened">Скрыть
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
        xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M0.646484 1.35359L1.35359 0.646484L5.00004 4.29293L8.64648 0.646484L9.35359 1.35359L5.00004 5.70714L0.646484 1.35359Z"
        fill="#211130" />
</svg>
</button>`);
    }
    jQuery('.faq__item:nth-child(n+7)').toggle(300);
    clickedBool = !clickedBool;
});

jQuery('.contact-page__info-item').on('click', function () {
    let itemIndex = jQuery('.contact-page__info-item').index(jQuery(this));
    jQuery('.contact-page__info-item').removeClass('contact-page__info-item_active');
    jQuery('.contact-page__map').hide().eq(itemIndex).show();
    jQuery('.contact-page__info-item').eq(itemIndex).addClass('contact-page__info-item_active');
});

jQuery(document).ready(function () {
    let courseGallery;
    let resultStr;
    let courrseTypeArray = [];
    courseGallery = new Swiper('.course-gallery__grid', {
        slidesPerView: 5,
        loop: true,
        autoplay: {
            delay: 3000
        },
        navigation: {
            prevEl: '.course-gallery__btn-prev',
            nextEl: '.course-gallery__btn-next'
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 5
            }
        }
    });
    jQuery(document).on('click', '.course-list__test-item', function () {
        jQuery(jQuery(this).data('modal-id')).modal();
    });
    //Test course
    if (jQuery('select[name="test-course-date"]').length !== 0) {
        let selectedValue = jQuery('select[name="test-course-date"]').find('option').eq(0).val();
        jQuery('input[name="ums-date"]').val(selectedValue);
    }
    jQuery('select[name="test-course-date"]').on('change', function () {
        let selectedValue = jQuery(this).val();
        jQuery('input[name="ums-date"]').val(selectedValue);
    });
    jQuery('.modal__checkbox input').on('click', function () {
        let selectedValue = jQuery(this).val();
        if (jQuery(this).is(':checked')) {
            courrseTypeArray.push(selectedValue);
            resultStr = courrseTypeArray.join(', ');
            jQuery('input[name="ums-choice"]').val(resultStr);
        } else {
            let currentElementArrayIndex = courrseTypeArray.indexOf(selectedValue);
            courrseTypeArray.splice(currentElementArrayIndex, 1);
            resultStr = courrseTypeArray.join(', ');
            jQuery('input[name="ums-choice"]').val(resultStr);
        }
    });
    /* Payment */
    //Payment section init data
    let paymentMethodIndex = 0;
    let courseNameValue = jQuery('select[name="payment-course-name"]').find('option:selected').val();
    let courseFullPriceValue = jQuery('select[name="payment-course-name"]').find('option:selected').data('full-price');
    let courseSalePriceValue = jQuery('select[name="payment-course-name"]').find('option:selected').data('sale-price');
    let totalPrice = courseSalePriceValue;

    function changeInputPriceValue(index, sale) {
        switch (index) {
            case 0:
                if (sale) {
                    totalPrice = courseSalePriceValue - (courseSalePriceValue * .1);
                    jQuery('.payment-section').eq(index).find('input[name="wsb_discount_name"]').val('Я студент-очник / я раньше уже учился у вас');
                } else {
                    totalPrice = courseSalePriceValue;
                    jQuery('.payment-section').eq(index).find('input[name="wsb_discount_name"]').val('Без скидки');
                }
                break;
            case 2:
                if (sale) {
                    totalPrice = Math.round(courseSalePriceValue / 2 - courseSalePriceValue / 2 * .1);
                    jQuery('.payment-section').eq(index).find('input[name="wsb_discount_name"]').val('Я студент-очник / я раньше уже учился у вас');
                } else {
                    totalPrice = courseSalePriceValue / 2;
                    jQuery('.payment-section').eq(index).find('input[name="wsb_discount_name"]').val('Без скидки');
                }
                break;
            case 3:
                totalPrice = courseFullPriceValue;
                break;
        }
        jQuery('.payment-section').eq(index).find('input[name="wsb_total"]').val(totalPrice);
        jQuery('.payment-section').eq(index).find('input[name="wsb_total"]').next().addClass('form__label_active').parent().addClass('form__input_filled');
    }
    changeInputPriceValue(paymentMethodIndex);
    //Payment section event listener
    jQuery('.payment-item__input').on('click', function () {
        paymentMethodIndex = jQuery('.payment-item').index(jQuery(this).parent());
        jQuery('body, html').animate({
            scrollTop: jQuery('#payment-anchor').offset().top
        }, 800);
        jQuery('.payment-section').hide();
        jQuery('.payment-section').eq(paymentMethodIndex).show();
        changeInputPriceValue(paymentMethodIndex);
    });
    //Payment section select event listener
    jQuery('select[name="payment-course-name"]').on('change', function () {
        courseNameValue = jQuery(this).val();
        courseFullPriceValue = jQuery(this).find('option:selected').data('full-price');
        courseSalePriceValue = jQuery(this).find('option:selected').data('sale-price');
        changeInputPriceValue(paymentMethodIndex);
    });
    //Payment section sale input event listener
    jQuery('input[name="sale"]').on('click', function () {
        if (jQuery(this).is(':checked')) {
            changeInputPriceValue(paymentMethodIndex, true);
        } else {
            changeInputPriceValue(paymentMethodIndex);
        }
    });
    //Payment section input event listener
    jQuery('input[name="wsb_total"]').on('input', function () {
        jQuery('input[name="sale"]').prop('checked', false);
        totalPrice = jQuery(this).val();
    });
    //Payment section input level event listener
    jQuery('input[name="paymentLevel"]').on('click', function () {
        let inputValue = jQuery(this).val();
        if (jQuery(this).is(':checked')) {
            jQuery('.payment-section').eq(paymentMethodIndex).find('input[name="wsb_order_tag"]').val('Рассрочка от "UX Mind", оплата за ' + inputValue + ' этап');
        }
    });
    jQuery('.webpay-form__btn').on('click', function (e) {
        e.preventDefault();
        let storeIdValue = jQuery(this).data('store-id');
        let paymentMethodValue = jQuery(this).data('payment-method');
        if (jQuery('.' + paymentMethodValue + '-payment').find('input[name="wsb_customer_name"]').is(':invalid')) {
            jQuery('.' + paymentMethodValue + '-payment').find('input[name="wsb_customer_name"]').addClass('wpcf7-not-valid').next().next().addClass('form__error-label_active');
        } else {
            jQuery('.' + paymentMethodValue + '-payment').find('input[name="wsb_customer_name"]').removeClass('wpcf7-not-valid').next().next().removeClass('form__error-label_active');
            jQuery.ajax({
                url: ajax.url,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'payment',
                    storeId: storeIdValue,
                    totalPrice: totalPrice,
                    productName: courseNameValue
                },
                beforeSend: function () {
                    jQuery('.' + paymentMethodValue + '-payment').find('button[type="submit"]').css('opacity', '.5');
                    jQuery('.' + paymentMethodValue + '-payment').find('button[type="submit"]').text('Обрабатываем данные...');
                },
                success: function (response) {
                    setTimeout(function () {
                        jQuery('.' + paymentMethodValue + '-payment').find('button').removeClass('webpay-form__btn-ajax');
                        jQuery('.' + paymentMethodValue + '-payment').find('input[name="wsb_order_num"]').val(response['wsb_order_num']);
                        jQuery('.' + paymentMethodValue + '-payment').find('input[name="wsb_seed"]').val(response['wsb_seed']);
                        jQuery('.' + paymentMethodValue + '-payment').find('input[name="wsb_signature"]').val(response['wsb_signature']);
                        jQuery('.' + paymentMethodValue + '-payment').find('input[name="wsb_invoice_item_name[0]"]').val(response['wsb_invoice_item_name']);
                        jQuery('.' + paymentMethodValue + '-payment').find('input[name="wsb_invoice_item_price[0]"]').val(response['wsb_invoice_item_price']);
                        jQuery('.' + paymentMethodValue + '-payment').find('button[type="submit"]').text('Перенаправляем на оплату...');
                        setTimeout(function () {
                            jQuery('.' + paymentMethodValue + '-payment').find('form').submit();
                            jQuery('.' + paymentMethodValue + '-payment').find('button[type="submit"]').css('opacity', '1');
                        }, 200);
                    }, 500);
                }
            });
        }
    });
    //Contact form7 event
    let elementTextContent;
    jQuery('.wpcf7 button[type="submit"]').on('click', function () {
        elementTextContent = jQuery(this).text();
        jQuery(this).addClass('btn_is-loading').text('Отправляем...');
    });
    let wpcf7Elm = document.querySelectorAll('.wpcf7');
    for (let item of wpcf7Elm) {
        item.addEventListener('wpcf7invalid', (event) => {
            item.querySelector('button[type="submit"]').textContent = elementTextContent;
            item.querySelector('button[type="submit"]').classList.remove('btn_is-loading');
        }, false);
        item.addEventListener('wpcf7mailsent', (event) => {
            item.querySelector('button[type="submit"]').textContent = elementTextContent;
            item.querySelector('button[type="submit"]').classList.remove('btn_is-loading');
            jQuery.modal.close();
            if (859 == event.detail.contactFormId || 131 == event.detail.contactFormId || 837 == event.detail.contactFormId) {
                jQuery('#success-modal-first').modal();
            } else {
                jQuery('#success-modal-second').modal();
            }
        }, false);
    }
});

//Payment
let paymentFormInputElements = document.querySelectorAll('.payment-form__input input');
if (paymentFormInputElements) {
    for (let item of paymentFormInputElements) {
        if (item.value) {
            item.parentElement.classList.add('form__input_filled');
            item.nextElementSibling.classList.add('form__label_active');
        }
        item.addEventListener('focus', () => {
            item.parentElement.classList.add('form__input_filled');
            item.parentElement.classList.add('form__input_focused');
            item.nextElementSibling.classList.add('form__label_active');
        });
        item.addEventListener('blur', () => {
            if (item.value) {
                item.parentElement.classList.remove('form__input_focused');
            } else {
                item.parentElement.classList.remove('form__input_filled');
                item.parentElement.classList.remove('form__input_focused');
                item.nextElementSibling.classList.remove('form__label_active');
            }
        });
    }
}

jQuery(document).on('click', '.course-list-item__select-name', function(){
    if (jQuery(this).hasClass('course-list-item__select-name_active')){
        jQuery(this).removeClass('course-list-item__select-name_active');
        jQuery(this).next().removeClass('dropdown_opened');
    }
    else{
        jQuery('.course-list-item__select-name').removeClass('course-list-item__select-name_active');
        jQuery('.dropdown').removeClass('dropdown_opened');
        jQuery(this).addClass('course-list-item__select-name_active');
        jQuery(this).next().addClass('dropdown_opened');
    }
});

function getLecturerInfo(lecturerIdValue, clickedElementTextValue, clickedElement){
    return jQuery.ajax({
        url: ajax.url,
        type: 'POST',
        data: {
            action: 'lecturer',
            id: lecturerIdValue
        },
        beforeSend: function(){
            clickedElement.css('opacity', .3);
            clickedElement.text('Загружаем...');
        }
    });
}

jQuery(document).on('click', '.dropdown-course-info__lecturer', function(){
    let lecturerIdValue = jQuery(this).data('lecturer-post-id');
    let clickedElement = jQuery(this);
    let clickedElementTextValue = clickedElement.text();
    let isMobileAjaxCompleted = false;
    jQuery.when(getLecturerInfo(lecturerIdValue, clickedElementTextValue, clickedElement)).then((response)=>{
        clickedElement.css('opacity', 1);
        clickedElement.text(clickedElementTextValue);
        jQuery('.dropdown-lecturer-modal').html(response);
        jQuery('.dropdown-lecturer-modal').modal();
        detectDeviceWidth();
        if (isMobile && !isMobileAjaxCompleted) {
            jQuery('.lecturer-modal__grid').after(jQuery('.lecturer-modal__text'));
            jQuery('.lecturer-modal__text').after(jQuery('.lecturer-modal__social'));
            isMobileAjaxCompleted = true;
        }
        else if (!isMobile && isMobileAjaxCompleted){
            jQuery('.lecturer-modal__title').after(jQuery('.lecturer-modal__text'));
            jQuery('.lecturer-modal__text').after(jQuery('.lecturer-modal__social'));
            isMobileAjaxCompleted = false;
        }
    });
});

jQuery('p.contact-page__info-item').on('click', function(){
    jQuery('body, html').animate({
        scrollTop: jQuery('#map-anchor').offset().top
    }, 800);
});

/**** Responsive ****/
//Functions
let customSwiper;
let isCustomSwiperInit = false;
let isMobile = false;
let isTablet = false;

function initSwiperSlider(element) {
    if (jQuery(element).length !== 0) {
        jQuery(element).addClass('swiper-container');
        jQuery(element).children().addClass('swiper-slide').wrapAll('<div class="swiper-wrapper"/>');
        customSwiper = new Swiper(element, {
            slidesPerView: 'auto',
            freeMode: true
        });
    }
}

function destroySwiperSlider(element) {
    if (customSwiper) {
        customSwiper.destroy();
        jQuery(element).removeClass('swiper-container');
        jQuery(element).children().children().removeClass('swiper-slide').unwrap();
    }
}

function detectDeviceWidth() {
    if (window.innerWidth < 992) {
        isMobile = true;
        isTablet = false;
    } else if (window.innerWidth > 991 && window.innerWidth < 1229) {
        isTablet = true;
        isMobile = false;
    } else if (window.innerWidth > 1229) {
        isTablet = false;
        isMobile = false
    }
}

function destroyMobileMenu() {
    jQuery('.header__info').append(jQuery('.header__menu'));
    jQuery('.header__info').append(jQuery('.header__phone-number'));
    jQuery('.header .col-3').append(jQuery('.header__select'));
}

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

function changeElementText(element, text) {
    if (document.querySelector(element)) {
        document.querySelector(element).textContent = text;
    }
}

function changeLayout() {
    if (isMobile && !isCompleted) {
        jQuery('.m-menu__grid').append(jQuery('.header__select'));
        jQuery('.m-menu__grid').append(jQuery('.header__menu'));
        jQuery('.m-menu__footer').prepend(jQuery('.header__phone-number'));
        changeElementText('.about-video__text', 'О школе');
        changeElementText('.portfolio__title', 'Работы учеников');
        changeElementText('.social-testimonials__name', 'Больше отзывов:');
        changeElementText('.play-button__name', 'О курсе');
        changeElementText('.form__textarea-btn-name', 'Комментарий');
        jQuery('.about-course__title').after(jQuery('.about-course__author'));
        jQuery('.about-course__title').after(jQuery('.about-course__video'));
        jQuery('.lecturer-modal__grid').after(jQuery('.lecturer-modal__text'));
        jQuery('.lecturer-modal__text').after(jQuery('.lecturer-modal__social'));
        if (!isCustomSwiperInit) {
            initSwiperSlider('.tabs');
            isCustomSwiperInit = true;
        }
        destroyWeCarousel();
        isCompleted = true;
    } else if (!isMobile && isCompleted) {
        destroyMobileMenu();
        changeElementText('.about-video__text', 'Видео о школе');
        changeElementText('.portfolio__title', 'Работы выпускников');
        changeElementText('.social-testimonials__name', 'А еще о нас много отзывов на:');
        changeElementText('.form__textarea-btn-name', 'Добавить комментарий');
        jQuery('.about-course .col-lg-7').append(jQuery('.about-course__video'));
        jQuery('.about-course .col-lg-7').append(jQuery('.about-course__author'));
        jQuery('.lecturer-modal__title').after(jQuery('.lecturer-modal__text'));
        jQuery('.lecturer-modal__text').after(jQuery('.lecturer-modal__social'));
        changeElementText('.play-button__name', 'Видео о курсе');
        if (isCustomSwiperInit) {
            destroySwiperSlider('.tabs');
            isCustomSwiperInit = false;
        }
        initWeCarousel();
        isCompleted = false;
    } else if (isTablet && !isCustomSwiperInit) {
        initSwiperSlider('.tabs');
        isCustomSwiperInit = true;
    } else if (!isTablet && !isMobile && isCustomSwiperInit) {
        destroySwiperSlider('.tabs');
        isCustomSwiperInit = false;
    }
}
//Menu
jQuery(window).on('resize', function () {
    detectDeviceWidth();
    changeLayout();
});
jQuery(window).on('scroll', function () {
    if (jQuery(window).scrollTop() >= 900){
        if (jQuery('.m-options__menu-btn')){
            jQuery('.m-options__menu-btn').addClass('m-options__menu-btn_active');
        }
    }
    else{
        jQuery('.m-options__menu-btn').removeClass('m-options__menu-btn_active');
    }
});
jQuery(document).ready(function () {
    initWeCarousel();
    detectDeviceWidth();
    changeLayout();
    jQuery('.m-menu__options-close-btn').on('click', function () {
        jQuery(this).closest('.m-menu').removeClass('m-menu_opened');
        jQuery('body').css('padding-right', '0');
        jQuery('html').removeClass('is-locked');
    });
    jQuery('.m-options__menu-btn').on('click', function () {
        jQuery('.m-menu').addClass('m-menu_opened');
        let scrollBarWidth = getScrollbarWidth();
        jQuery('html').addClass('is-locked');
        jQuery('body').css('padding-right', scrollBarWidth);
    });
});
/**** Responsive ****/