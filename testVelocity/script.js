(function($){

	/*$('.box').velocity({  //operation (ou animation) a faire
		translateY: [0,500],
		opacity: [1, 0]
	}, { // parametrage
		duration: 800,
		display: 'block',
		easing: [70, 8]
	}).velocity('reverse', {
		delay: 1000
	});
	*/ 
	//.velocity('reverse') faire l'animation, puis la refaire dans le sens inverse

	/*.velocity({ // operation a la suite de la premiere
		translateY: [500, 0],
		opacity: [0, 1]
	}, {
		duration: 1000,
		//complete: function(){ que faire quand on a fini l'animation

		//}
		display: 'none'
	});*/

	$.Velocity.Sequences.fadeInUp = function(element, options){
		options.duration = options.duration || 800; //  800 par defaut
		$.Velocity.animate(element, {
			translateY: [0, 500],
			opacity: [1, 0]
		}, {
			duration: options.duration,
			display: 'block',
			easing: [70, 8]
		})
	}

	$divs = $('.box, .box-title, input, p');

	$('a').click(function(element){ // si on click sur le lien
		element.preventDefault();
		element.stopPropagation();
		$divs.hide().velocity('transition.bounceUpIn', { // on cache les elements avec hide() au debut
			duration: 1000, 
			stagger: 100 // les elements (de divs) vont arriver en décalé
		})
	});

	$('.box-overlay').click(function(e){
		e.preventDefault();
		$divs.velocity('transition.bounceDownOut', {
			duration: 1000,
			stagger: 100,
			backwards: true
		})
	})

	$('.box').click(function(e){
		e.stopPropagation();
	})

	/* on utilise un truc tout fait 
	$divs.velocity('transition.bounceUpIn').velocity('reverse', {
		delay: 1000
	});
	*/


	//pour appeller la fonction fadeInUp (ci dessous) la fonctio est a declarer avant
	/*$('.box').velocity('fadeInUp').velocity('reverse', { // options
		duration : 1500, 
		delay: 1000
	});*/

	

})(jQuery);
