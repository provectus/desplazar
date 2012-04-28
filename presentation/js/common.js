$(function() {

    var bgImages = [ '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg' ];
    var currImage = 'main.jpg';
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

    $(document)
        .on('click', '.horizontal-next-slide', function(e){ app.slideTo(1,1); })
        .on('click', '.vertical-prev-slide', function(e){ app.slideshow.prev(); })
        .on('click', '.vertical-next-slide', function(e){ app.slideshow.next(); });

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
		imageBtnClose: 'assets/gallery/close_min.png',
		imageLoading: 'assets/gallery/ajax-loader.gif'
	});
	$('a[rel="lightbox[group2]"]').lightBox({
		imageBtnPrev: 'assets/gallery/prev-min1.png',
		imageBtnNext: 'assets/gallery/next-min1.png',
		imageBtnClose: 'assets/gallery/close_min.png',
		imageLoading: 'assets/gallery/ajax-loader.gif'
	});
	$('a[rel="lightbox[group3]"]').lightBox({
		imageBtnPrev: 'assets/gallery/prev-min1.png',
		imageBtnNext: 'assets/gallery/next-min1.png',
		imageBtnClose: 'assets/gallery/close_min.png',
		imageLoading: 'assets/gallery/ajax-loader.gif'
	});


    var Media = function(container, options) {
        var defaults = {
            basepath: '/public',
            success: function() {
                console.log('success');
            }
        };

        this.options = $.extend({}, defaults, options);

        this.container = $(container);

        this.type = this.container.data('media');

        var previewNum = this.container.data('preview-num');
        this.previewNum = parseInt(previewNum == undefined ? 'off' : previewNum);

        this.prefix = this.container.data('subdir') || '';

        this.subdir = this.parsePathname(document.location.pathname);

        switch(this.type) {
            case 'photos':
                this.ext = '.jpg';
            break;
            case 'videos':
                this.ext = '.mp4';
            break;
            case 'link':
                this.ext = '.pdf';
            break;
        }

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
                var group = 'lightbox[' + this.subdir + this.prefix + this.type + ']';
                var path = this.buildMediaPath();
                var cls = '';
                for(var i = 1; i <= settings.count; ++i) {

                    if (this.previewNum != 'off' && i > this.previewNum) {
                        cls = 'hidden';
                    }

                    this.container.append(
                        $('<div>').attr({ class: 'gallery-item video ' + cls }).append(
                            $('<a>').attr({
                                href: path + '/' + i + this.ext,
                                rel: group
                            }).append(
                                $('<img>').attr({
                                    src: path + '/' + i + '_thumb' + '.jpg'
                                })
                            )
                        )
                    );
                }
                this.options.success.apply(this, [this.container]);
            }.bind(this));
        },

        parsePathname: function(pathname) {
            return pathname.split('/')[1].split('.')[0]
        },

        buildMediaPath: function() {
            var path = [
                this.options.basepath,
                this.type,
                this.subdir,
            ];

            if(this.prefix) {
                path.push(this.prefix);
            }

            return path.join('/');
        }
    };

    $('[data-media]').each(function(idx, element){
        new Media(element, {
            success: function(container) {
                var clicker = $(container).data('click');
                if(clicker) {
                    var element = container.find('a').first();
                    $(document.getElementById(clicker)).bind('click', function(evt){
                        evt.preventDefault();
                        element.click();
                    })
                }

                if(this.type == 'link') return;

                $(container).find('a').lightBox({
            		imageBtnPrev: 'assets/gallery/prev-min1.png',
            		imageBtnNext: 'assets/gallery/next-min1.png',
            		imageBtnClose: 'assets/gallery/close_min.png',
            		imageLoading: 'assets/gallery/ajax-loader.gif',
                    media: $(container).data('media')
            	});
            }
        });
    });

    $('#canvas > ul > li > ul > li').each(function() {
        $(this).find('.gallery-wrap').each(function(idx, item){
            if(idx) {
                var offset = parseInt($(item).css('top'));
                $(item).css({ top: offset * (idx+1) + 50});
            }
        })
    });

});
