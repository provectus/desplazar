$(function() {

    var bgImages = [ '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg' ];
    var currImage = '01.jpg';
    setInterval( function(){
        do{
            var randImage = bgImages[Math.ceil(Math.random()*(bgImages.length-1))];
        }while( randImage == currImage )
        currImage = randImage;
        $('#main').BgImageTransition( 'assets/pages/main/rots/'+currImage );
        console.log(currImage);
    }, 5000)

    $('a[href^=#]').bind('click', function(evt){
        evt.preventDefault();
        var element = $($(this).attr('href'));
        if(element) {
            element.toggle();
        }
    });

    var externalContainer = $('#external-container').hide();
    $('a[data-external=true]').bind('click', function(evt) {
        //evt.preventDefault();
        //externalContainer.html($('<iframe>').attr({ src: $(this).attr('href') }).addClass('subpage')).fadeIn(1000);
    });

    $('a[data-external=false]').bind('click', function(evt) {
        evt.preventDefault();
    });

    var app = new Desplazar($('#canvas'), {
        direction: Desplazar.VERTICAL,
        onClose: function() {
            //externalContainer.fadeOut();
        }
    });

    document.ontouchmove = function (event) {
        if (!event.elementIsEnabled) {
            event.preventDefault();
        }
    };

    $('.scrollable').each(function(idx, element){
        element.ontouchmove = function(event) {
            event.elementIsEnabled = true;
        }
    });


	$('a[rel="lightbox[group1]"]').lightBox({
		imageBtnPrev: 'assets/gallery/prev-min1.png',
		imageBtnNext: 'assets/gallery/next-min1.png',
		imageBtnClose: 'assets/gallery/close_min.png'
	});
	$('a[rel="lightbox[group2]"]').lightBox({
		imageBtnPrev: 'assets/gallery/prev-min1.png',
		imageBtnNext: 'assets/gallery/next-min1.png',
		imageBtnClose: 'assets/gallery/close_min.png'
	});
	$('a[rel="lightbox[group3]"]').lightBox({
		imageBtnPrev: 'assets/gallery/prev-min1.png',
		imageBtnNext: 'assets/gallery/next-min1.png',
		imageBtnClose: 'assets/gallery/close_min.png'
	});

});
