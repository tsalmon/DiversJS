function randomTransition(i){	
	switch(Math.floor(Math.random()*25)){
		case  0: return 'transition.fade';
		case  1: return 'transition.flipX';
		case  2: return 'transition.flipY';
		case  3: return 'transition.flipBounceY';
		case  4: return 'transition.flipBounceX';
		case  5: return 'transition.swoop';
		case  6: return 'transition.whirl';
		case  7: return 'transition.shrink';
		case  8: return 'transition.bounce';
		case  9: return 'transition.bounceUp';
		case 10: return 'transition.bounceDown';
		case 11: return 'transition.bounceLeft';
		case 12: return 'transition.bounceRight';
		case 13: return 'transition.slideUp';
		case 14: return 'transition.slideDown';
		case 15: return 'transition.slideLeft';
		case 16: return 'transition.slideRight';
		case 17: return 'transition.slideUpBig';
		case 18: return 'transition.slideDownBig';
		case 19: return 'transition.slideLeftBig';
		case 20: return 'transition.slideRightBig';
		case 21: return 'transition.perspectiveUp';
		case 22: return 'transition.perspectiveDown';
		case 23: return 'transition.perspectiveLeft';
		case 24: return 'transition.perspectiveRight';
	}
}

(function($){
	$divs = $('.box');

	$('#sign_up_button').velocity({
		translateX: [0,100],
		opacity: [1, 0],
	}, {
		duration: 1000
	});

	$('a').click(function(element){ 
		element.preventDefault();
		element.stopPropagation();
		
		i = randomTransition() + "In";
		j = randomTransition() + "Out";

		$divs.velocity(i, {
				duration: 1000,
			}).velocity(j, {
				duration: 1000,
			});	

	});
})(jQuery);
