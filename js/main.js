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
    var slider1, slider2, flagSlide = false;
    var sliders = function(countSlides, startSl){
    	slider1 = $('.slider1').bxSlider({
    		slideWidth: 330,
    		minSlides: 1,
    		maxSlides: countSlides,
    		slideMargin: 5,
    		pager: false,
    		nextText: '',
    		prevText: '',
    		moveSlides: 1,
    		infiniteLoop: false,
    		startSlide: startSl
    	});
    	slider2 = $('.slider2').bxSlider({
    		slideWidth: 303,
    		minSlides: 1,
    		maxSlides: countSlides,
    		slideMargin: 25,
    		pager: false,
    		nextText: '',
    		prevText: '',
    		moveSlides: 1,
    		infiniteLoop: false,
    		startSlide: startSl
    	});
    };
	var showSliders = function(){
		var winWidtn = $(window).width();
		if(winWidtn > 640 && !flagSlide){
			sliders(3, 0);
			flagSlide = true;
			console.log('aewewer');
		} else if(winWidtn <= 640 && flagSlide) {
			slider1.destroySlider();
			slider2.destroySlider();
		}
		if(slider1 && slider2 && winWidtn < 640){
			slider1.destroySlider();
			slider2.destroySlider();
			flagSlide = false;
		}
	}
	showSliders();
	$(window).resize(function(){
		showSliders();
		moreItems();
	})
	var wayp = (function(){
		var showSection = function(section, isAnimate){
				if(section && section !=='#'){
					console.log(section)
					var
						hasSec = section.replace('#', ''),
						newSec = $('.section').filter('[data-section="' + hasSec + '"]'),
						posSec = newSec.offset().top - 80;
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
				$('.nav ul li a, .header__link-contact').on('click', function(e){
					e.preventDefault();
					showSection($(this).attr('href'), true);
				})
			})
	}());
	var closePopup = (function(){
		var btnClose = $('.popup__close');
		btnClose.on('click', function(){
			$.fancybox.close();
		})
	}());
	var answer = (function(){
		var form = $('.popup-question').find('form');
		form.submit(function(){
			localStorage.setItem('answer', true)
		})
	}());
	var showAnswer = (function(){
		var statusAnswer = localStorage.getItem('answer');
		if(statusAnswer){
			$.fancybox('#popup-answer');
			localStorage.removeItem('answer');
		}
	}())
	var openNav = (function(){
		var btn = $('.header__btn-nav'),
			nav = $('.nav');
		btn.on('click', function(){
			if (!nav.hasClass('active')) {
				nav.addClass('active');
			} else {
				nav.removeClass('active');
			}
		})
		$('.nav__link').on('click', function(){
			if (!nav.hasClass('active')) {
				nav.addClass('active');
			} else {
				nav.removeClass('active');
			}
		})
		$(document).on('click', function(e){
		    if (!nav.is(e.target) && nav.has(e.target).length === 0 && !btn.is(e.target) && btn.has(e.target).length === 0 ) {
		        if(nav.hasClass('active')){
		           nav.removeClass('active')
		        }
		    }
		})
	}());

	var moreItems = function(){
		var btn = $('.btn-more'),
			winWidth = $(window).width();
		if(winWidth < 640){
			btn.map(function(){
				var $this = $(this),
					item = $this.parent().find('.item');
				if(item.length > 0){
					item.map(function(e){
						var $this = $(this),
							ind = e+1;
						item.eq(ind).hide();
					})
				}
			})
		} else  {
			$('.item').show();
		}
		btn.on('click', function(e){
			e.preventDefault();
			var $this = $(this),
				item = $this.parent().find('.item');
			$this.hide();
			item.show();
		})
	}
	moreItems();
})


/*-- ajax Form --*/
function sendAjaxForm() {
    
    var str = $("#form_question").serialize();
    console.log(str);
    $('.fancybox-close').click();
    return false;
    $.post("/include/ajax_count.php",str,function(data){
    	$(".count_result").html(data);
    });
}

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