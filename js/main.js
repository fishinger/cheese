$(document).ready(function(){
	/*--fancybox--*/
	$(".open-popup").fancybox({
    	openEffect	: 'elastic',
    	closeEffect	: 'elastic',
    	scrolling: 'visible',
    	padding: 0,
    	width: 695,
    	helpers : {
    		title : {
    			type : 'inside'
    		}
    	}
    });
    /*--end-fancybox--*/

	$('.slider1').bxSlider({
		slideWidth: 354,
		minSlides: 1,
		maxSlides: 3,
		slideMargin: 5,
		pager: false,
		nextText: '',
		prevText: '',
		moveSlides: 1
	});
	$('.slider2').bxSlider({
		slideWidth: 303,
		minSlides: 1,
		maxSlides: 3,
		slideMargin: 25,
		pager: false,
		nextText: '',
		prevText: '',
		moveSlides: 1
	});
	var wayp = (function(){
		var showSection = function(section, isAnimate){
				if(section && section !=='#'){
					console.log(section)
					var
						hasSec = section.replace('#', ''),
						newSec = $('.section').filter('[data-section="' + hasSec + '"]'),
						posSec = newSec.offset().top;
					if(isAnimate){
						$('html, body').animate({scrollTop: posSec}, 500);
					} else {
						$('html, body').scrollTop(posSec);
					}
					
				}
				
			}
			var activsection = function(){
				$('.section').each(function(e){
					var $this = $(this),
						topSec = $this.offset().top - 200,
						botSec = $this.height() + topSec,
						winScroll = $(window).scrollTop();
					if(topSec < winScroll && botSec > winScroll){
						var secId = $this.data('section'),
							activLink = $('.nav__link').filter('[href="#' + secId + '"]');
						activLink.addClass('active')
						.closest('li')
						.siblings()
						.find('.nav__link')
						.removeClass('active');
						window.location.hash = secId;
					}
				})
			}
			$(window).scroll(function(){
				activsection();
			})
			$(document).ready(function(){
				showSection(window.location.hash, false);
				$('.nav ul li a').on('click', function(e){
					e.preventDefault();
					showSection($(this).attr('href'), true);
				})
			})
	}());
})

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [54.55030800335883,36.277614123700054],
            zoom: 14,
            controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка',
            balloonContentBody: [
				'<ul>',
				'<li>',
				'Калужская область, ',
				'фермерское хозяйство ',
				'Кошманова',
				'</li>',
				'<li>',
				'<a href="tel:+7823)7896321">+7 (823) 789 63 21</a>',
				'</li>',
				'<li>',
				'<a href="mailto:Guberny@gmail.com">Guberny@gmail.com</a>',
				'</li>',
				'</ul>'
            ].join('')
        },
        {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map-label1.png',
            // Размеры метки.
            iconImageSize: [43, 61],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-3, -42]
        });

    myMap.geoObjects.add(myPlacemark);
});