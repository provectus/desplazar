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

    var app = new Desplazar($('#canvas'), { direction: Desplazar.VERTICAL });

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


    var Media = function(container, options) {
        var defaults = {
            basepath: '/public',
        };

        this.options = $.extend({}, defaults, options);

        this.container = $(container);

        this.type = this.container.data('media');
        this.subdir = this.parsePathname(document.location.pathname);
        this.ext = this.type == 'photos' ? '.jpg' : '.mp4';

        this.drawGallery();
    };

    Media.prototype = {
        getSettings: function(callback) {
            var path = [
                this.buildMediaPath(),
                'settings.json'
            ].join('/');
            $.getJSON(path, callback);
        },

        drawGallery: function() {
            this.getSettings(function(settings) {
                var group = 'lightbox[' + this.subdir + this.type + ']';
                var path = this.buildMediaPath();
                var cls = '';
                for(var i = 0; i < settings.count; ++i) {

                    if (i >= 2) {
                        cls = 'hidden';
                    }

                    this.container.append(
                        $('<div>').attr({ class: 'gallery-item video' }).addClass(cls).append(
                            $('<a>').attr({
                                href: path + '/' + i + this.ext,
                                rel: group
                            }).append(
                                $('<img>').attr({
                                    src: path + '/' + i + '_thumb' + '.jpg'
                                })
                            ).lightBox({
		                        imageBtnPrev: 'assets/gallery/prev-min1.png',
                        		imageBtnNext: 'assets/gallery/next-min1.png',
                        		imageBtnClose: 'assets/gallery/close_min.png',
                                media: this.type
                        	})
                        )
                    );
                }

            }.bind(this));
        },

        parsePathname: function(pathname) {
            return pathname.split('/')[1].split('.')[0]
        },

        buildMediaPath: function() {
            return [
                this.options.basepath,
                this.type,
                this.subdir
            ].join('/');
        }
    };

    $('[data-media]').each(function(idx, element){
        new Media(element);
    });

});
