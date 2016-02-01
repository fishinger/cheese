$(document).ready(function(){
	/*--fancybox--*/
	// $(".open-popup").fancybox({
 //    	openEffect	: 'elastic',
 //    	closeEffect	: 'elastic',
 //    	scrolling: 'visible',
 //    	padding: 0,
 //    	width: 640,
 //    	helpers : {
 //    		title : {
 //    			type : 'inside'
 //    		}
 //    	}
 //    });
    /*--end-fancybox--*/

	$('.slider1').bxSlider({
		slideWidth: 354,
		minSlides: 3,
		maxSlides: 3,
		slideMargin: 5,
		pager: false,
		nextText: '',
		prevText: '',
		moveSlides: 1
	});
})