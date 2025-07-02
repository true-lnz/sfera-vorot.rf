// Общий для всего проекта JS-код

$(window).on('load', function () {
	// Галерея
	document.querySelectorAll('.gallery__slider').forEach(n => {
		const gallerySlider = new Swiper(n.querySelector('.swiper'), {
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			navigation: {
				nextEl: n.querySelector('.slider-button--next'),
				prevEl: n.querySelector('.slider-button--prev'),
			},
			breakpoints: {
				320: {
					spaceBetween: 10,
				},

				768: {
					spaceBetween: 20,
				},

				1601: {
					spaceBetween: 50,
				},
			}
		});
	});

	$('[data-fancybox]').fancybox({
		iframe: {
			css: {
				width: '360px',
				height: '643px',
			},
			attr: {
				allow: "autoplay; fullscreen"
			}
		}
	});
});
