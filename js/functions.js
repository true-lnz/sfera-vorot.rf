// Общий для всего проекта JS-код

$(window).on('load', function () {
	// Появление мобильного меню
	$('.js-mobile-open').on('click', function () {
		$('.mobile').addClass('mobile--open');
		$('body').addClass('mobile-scroll');
	});

	// Скрытие мобильного меню
	$('.js-mobile-close').on('click', function () {
		$('.mobile').removeClass('mobile--open');
		$('body').removeClass('mobile-scroll');
	});

	// Появление и скрытие каталога
	$('.js-catalog').on('click', function () {
		$(this).toggleClass('button--active');
		$(this).next().toggleClass('header__catalog-content--open');
	});

	// Красивый селект
	$('select').niceSelect();

	// Подключение fancybox
	$('[data-fancybox="gallery"]').fancybox();


	// Нумерованный инпут
	$('.js-number-down').on('click', function () {
		let input = $(this).parent().find('input'),
		minVal = input.attr('min'),
		inputVal = parseFloat(input.val()),
		inputNewVal;
		if (inputVal <= minVal) {
			inputNewVal = inputVal;
		} else {
			inputNewVal = inputVal - 1;
		}
		input.val(inputNewVal);
	});

	$('.js-number-up').on('click', function () {
		let input = $(this).parent().find('input'),
		inputVal = parseFloat(input.val()),
		maxVal = input.attr('max'),
		inputNewVal;

		if (inputVal >= maxVal) {
			inputNewVal = inputVal;
		} else {
			inputNewVal = inputVal + 1;
		}
		input.val(inputNewVal);
	});


	// Табы
	var tabs,
		tabsLabel;

	$('.js-tabs').on('change', openTab);
	$('.js-accordion').on("click", openTab);

	function openTab() {
		const dataIndex = $(this).attr('data-index');
		const buttonsTrigger = $(`[data-index="${dataIndex}"]`);
		const blockContent = $(`[data-content-index="${dataIndex}"]`);

		if (!$(`input[data-index="${dataIndex}"]`).prop('checked')) {
			buttonsTrigger.prop('checked', true);
		}

		if ($(this).hasClass('js-accordion--open')) {
			buttonsTrigger.removeClass('js-accordion--open');
		} else {
			if (isDesktop()) {
				$('.js-accordion--open').removeClass('js-accordion--open');
			}
			buttonsTrigger.addClass('js-accordion--open');
		}
		if (blockContent.hasClass('content-open')) {
			if (isDesktop()) {
				$('.tabs__content').removeClass('content-open').attr('style', 'display: none;');
			} else {
				blockContent.removeClass('content-open').attr('style', 'display: none;');
			}
		} else {
			if (isDesktop()) {
				$('.tabs__content').removeClass('content-open').attr('style', 'display: none;');
			}
			blockContent.addClass('content-open').attr('style', 'display: block;');
		}
	}
	if (isDesktop()) {
		if ($('.content-open').length !== 1) {
			$(`.js-accordion[data-index="0"]`).trigger('click');
		}
	}
	$(window).resize(function() {
		if (isDesktop()) {
			if ($('.content-open').length !== 1) {
				$(`.js-accordion[data-index="0"]`).trigger('click');
			}
		}
	});

	function isDesktop() {
		return window.innerWidth > 991;
	}

	// $('.js-tabs').on('change', showTabs);

	// function showTabs() {
	// 	$(this).prop('checked');
	// 	tabs = $(this).closest('.tabs');
	// 	tabsLabel = $(this).parent();
	// 	tabs.children('.tabs__contents').children('.tabs__content').addClass('hidden')
	// 		.eq(tabsLabel.index()).removeClass('hidden');
	// }


	// // Аккордион
	// $('.js-accordion').on("click", function () {
	// 	$(this).toggleClass('js-accordion--open').parent().next().slideToggle();
	// 	// $('.accordion').not(this).removeClass('accordion--open').parent().next().slideUp();
	// });


	// Слайдер выполненных работ
	const completedWorksSlider = new Swiper('.completed-works__slider', {
		// autoplay: true,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
		speed: 600,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},

		pagination: {
			el: '.completed-works .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	// Слайдер отзывов
	const reviewsSlider = new Swiper('.reviews-slider', {
		// autoplay: true,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
		speed: 600,
		loop: true,
		spaceBetween: 90,

		navigation: {
			nextEl: '.reviews-slider .swiper-button--next',
			prevEl: '.reviews-slider .swiper-button--prev',
		},

		pagination: {
			el: '.reviews-slider .swiper-pagination',
			type: 'fraction',
		},
	});

	// Слайдер преимуществ
	const advantagesSlider = new Swiper('.advantages__slider', {
		// autoplay: true,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
		speed: 600,
		watchSlidesProgress: true,
		slidesPerView: 'auto',
		spaceBetween: 5,

		navigation: {
			nextEl: '.advantages__slider .swiper-button--next',
			prevEl: '.advantages__slider .swiper-button--prev',
		},
	});

	// Слайдер товара
	const productSlider = new Swiper('.product__slider', {
		// autoplay: true,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
		speed: 600,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},

		pagination: {
			el: '.product .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	// Слайдер товара
	const productsSlider = new Swiper('.products__slider', {
		// autoplay: true,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
		speed: 600,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},

		pagination: {
			el: '.products__slider .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	// Слайдер обычный
	const swiperSlider = new Swiper('.slider .swiper', {
		// autoplay: true,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
		speed: 600,
		spaceBetween: 10,

		navigation: {
			nextEl: '.slider .slider-button--next',
			prevEl: '.slider .slider-button--prev',
		},
	});


	// Модальные окна
	function openModal(selector) {
		$('.modals').fadeIn();
		$(selector).fadeIn();
		$('body').addClass('modals-scroll');
	}

	function closeModal() {
		$('.modal').fadeOut();
		$('.modals').fadeOut();
		$('body').removeClass('modals-scroll');
	}

	$('[data-modal-target]').on('click', function (evt) {
		evt.preventDefault();
		let target = $(this).attr('data-modal-target');
		openModal(target);
	})


	$(document).on('click', function (evt) {
		if ($(evt.target).hasClass('js-modal-close')) {
			closeModal();
		}
	});

	$(document).on('keydown', function (evt) {
		if (evt.keyCode == 27) {
			closeModal();
		}
	});



	window.api = {
		modals: {
			open: openModal,
			close: closeModal,
		}
	};
});
