
var Slideshow = function(container) {
    this.container = $(container);

    this.slides = this.container.children();
    this.width = this.container.parent().width();

    this.current = 0;
    this.totalSlides = this.slides.length;
};

Slideshow.prototype = {

    reset: function() {
        this.width = this.container.parent().width();
    },

    slideTo: function(index) {
        if(index > this.totalSlides - 1) {
            index = this.totalSlides - 1;
        } else if(index < 0) {
            index = 0;
        }

        if(index == this.current) {
            return false;
        }

        this.container.css({ left: 0 - (this.width * index) });
        this.current = index;

        return true;
    },

    next: function() {
        return this.slideTo(this.current + 1);
    },

    prev: function() {
        return this.slideTo(this.current - 1);
    },

    getContainer: function() {
        return this.container;
    },

    getCurrent: function() {
        return $(this.slides.get(this.current));
    }
};

var Desplazar = function(container) {

    this.container = $(container);
    this.slider = $(this.container).find('ul').first();

    this.width  = this.container.width();
    this.height = this.container.height();

    this.hammer = $(this.slider).hammer();
    this.slideshow = new Slideshow(this.slider);

    this.setup();
    this.bind();

    this.onresize();
};

Desplazar.prototype = {

    onresize: function() {
        var self = this;
        $(window).resize(function() {
            self.width  = $(window).width();
            self.height = $(window).height();
            self.setup();
            self.slideshow.reset();
        });
    },

    setup: function() {
        var self = this,
            defaults = {
                height: this.height,
                width: this.width
            },

            setDimensions = function(obj, options) {
                options = $.extend({}, defaults, options || {});
                $(obj).width(options.width).height(options.height);
            };

        //setDimensions(this.container);
        setDimensions(this.slider, { width: this.width * this.slideshow.totalSlides});
        $(this.slider).children().each(function(idx, item) {
            setDimensions(item);
        });
    },

    bind: function() {
        var self = this;
        this.hammer.bind('drag', function(ev) {
            var left = 0;

            if(ev.direction == 'left') {
                left = 0 - ev.distance;
            } else if(ev.direction == 'right') {
                left = ev.distance;
            }

            self.slideshow.getContainer().css({ marginLeft: left });
        }).bind('dragend', function(ev) {
            self.slideshow.getContainer().css({ marginLeft: 0 });

            if(Math.abs(ev.distance) > 100) {
                if(ev.direction == 'right') {
                    self.slideshow.prev();
                } else if(ev.direction == 'left') {
                    self.slideshow.next();
                }
            }
        });
    }

}
