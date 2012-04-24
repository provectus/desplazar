
var Slideshow = function(container, options) {
    this.container = $(container);
    this.options = options;

    this.slides = this.container.children();
    this.width = this.container.parent().width();
    this.height = this.container.parent().height();

    this.current = 0;
    this.totalSlides = this.slides.length;
};

Slideshow.prototype = {

    reset: function() {
        this.width = this.container.parent().width();
        this.height = this.container.parent().height();
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

        switch(this.options.direction) {
            case Desplazar.HORIZONTAL: css = { left: 0 - (this.width * index) }; break;
            case Desplazar.VERTICAL: css = { top: 0 - (this.height * index) }; break;
        }

        this.container.css(css);
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

var Desplazar = function(container, options) {

    var defaults = {
        direction: Desplazar.HORIZONTAL
    };

    this.options = $.extend({}, defaults, options);

    this.container = $(container);
    this.slider = $(this.container).find('ul').first();

    this.width  = this.container.width();
    this.height = this.container.height();

    this.hammer = $(this.slider).hammer();
    this.slideshow = new Slideshow(this.slider, this.options);

    this.setup();
    this.bind();
};

Desplazar.VERTICAL = 0;
Desplazar.HORIZONTAL = 1;

Desplazar.prototype = {

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

        var opts = {}
        switch(this.options.direction) {
            case Desplazar.HORIZONTAL:
                opts = { width: this.width * this.slideshow.totalSlides };
                break;
            case Desplazar.VERTICAL:
                opts = { height: this.height * this.slideshow.totalSlides };
                break;
        }

        setDimensions(this.slider, opts);
    },

    bind: function() {
        var self = this;
        this.hammer.bind('drag', function(ev) {
            var left = 0,
                top = 0;

            if(self.options.direction == Desplazar.VERTICAL) {
                if(ev.direction == 'up') {
                    top = 0 - ev.distance;
                } else if(ev.direction == 'down') {
                    top = ev.distance;
                }
            } else if (self.options.direction == Desplazar.HORIZONTAL) {
                if(ev.direction == 'left') {
                    left = 0 - ev.distance;
                } else if(ev.direction == 'right') {
                    left = ev.distance;
                }
            }

            self.slideshow.getContainer().css({ marginLeft: left, marginTop: top });
        }).bind('dragend', function(ev) {
            self.slideshow.getContainer().css({ marginLeft: 0, marginTop: 0 });

            if(Math.abs(ev.distance) > 100) {
                if((self.options.direction == Desplazar.HORIZONTAL && ev.direction == 'right') || (self.options.direction == Desplazar.VERTICAL && ev.direction == 'down')) {
                    self.slideshow.prev();
                } else if((self.options.direction == Desplazar.HORIZONTAL && ev.direction == 'left') || (self.options.direction == Desplazar.VERTICAL && ev.direction == 'up')) {
                    self.slideshow.next();
                }
            }
        });
    }

}
