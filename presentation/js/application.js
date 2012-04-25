Function.prototype.bind = function(ctx) {
    var self = this;
    return function(){
        return self.apply(ctx, arguments);
    }
};

var Desplazar = function(container, options) {

    var defaults = {
        base: this,
        direction: Desplazar.VERTICAL
    };

    this.options = $.extend({}, defaults, options);

    this.base = this.options.base;

    this.container = $(container);
    this.slider = $(this.container).find('ul').first();

    this.width  = this.container.width();
    this.height = this.container.height();

    this.hammer = $(this.slider).hammer();
    this.slideshow = new Desplazar.Slideshow(this.slider, this.options);
    this.children = [];

    this.current = 0;

    $(this.slider).find('> li').each(function(idx, item) {
        this.children.push(new Desplazar($(item), {
            base: this,
            direction: Desplazar.HORIZONTAL
        }));
    }.bind(this));

    this.setup();
    this.bind();
};

Desplazar.VERTICAL = 0;
Desplazar.HORIZONTAL = 1;

Desplazar.Slideshow = function(container, options) {
    this.container = $(container);
    this.options = options;

    this.slides = this.container.children();
    this.width = this.container.parent().width();
    this.height = this.container.parent().height();

    this.current = 0;
    this.totalSlides = this.slides.length;
};

Desplazar.Slideshow.prototype = {

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
        if(this.options.base && this.options.direction == Desplazar.HORIZONTAL) {
            this.options.base.setCurrent(index);
            this.options.base.hammer.unbind('touchmove');
            var hammer = this.options.base.hammer;
            if(index) {
                hammer.bind('touchmove', function(evt) { })
            } else {
                hammer.bind('touchmove', function(evt) { evt.preventDefault(); })
            }
        }

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

Desplazar.Dummy = function() {};
Desplazar.Dummy.prototype = {
    type: 'dummy',
    setCurrent: function(value) { },
    getCurrent: function() { return 0 }
};

Desplazar.prototype = {

    setCurrent: function(value) {
        console.log('setting current: ', value);
        this.current = value;
    },

    getCurrent: function() {
        return this.current;
    },

    setup: function() {
        var defaults = {
            height: this.height,
            width: this.width
        };

        var setDimensions = function(obj, options) {
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

    onDrag: function(ev) {
        var left = 0,
            top = 0;

        if(this.options.direction == Desplazar.VERTICAL && this.base.getCurrent() == 0) {
            if(ev.direction == 'up') {
                top = 0 - ev.distance;
            } else if(ev.direction == 'down') {
                top = ev.distance;
            }
        } else if(this.options.direction == Desplazar.HORIZONTAL) {
            if(ev.direction == 'left') {
                left = 0 - ev.distance;
            } else if(ev.direction == 'right') {
                left = ev.distance;
            }
        }

        this.slideshow.getContainer().css({ marginLeft: left, marginTop: top });
    },
    onDragEnd: function(ev) {

        this.slideshow.getContainer().css({ marginLeft: 0, marginTop: 0 });

        if(Math.abs(ev.distance) > 100) {
            if((
                this.options.direction == Desplazar.HORIZONTAL &&
                ev.direction == 'right'
            ) || (
                this.options.direction == Desplazar.VERTICAL &&
                ev.direction == 'down' &&
                this.base.getCurrent() == 0
            )) {
                this.slideshow.prev();
            } else if((
                this.options.direction == Desplazar.HORIZONTAL &&
                ev.direction == 'left'
            ) || (
                this.options.direction == Desplazar.VERTICAL &&
                ev.direction == 'up' &&
                this.base.getCurrent() == 0
            )) {
                this.slideshow.next();
            }
        }

        //if(this.base.getCurrent()) {
        //    this.hammer.unbind('drag');
        //    this.hammer.unbind('dragend');
        //}
    },

    bind: function() {
        this.hammer
            //.bind('touchmove', function(evt) {
            //    var overflow = $(evt.target).css('overflow');
            //    if(!(overflow == 'scroll' || overflow == 'auto')) {
            //        evt.preventDefault();
            //    }
            //})
            .bind('drag', this.onDrag.bind(this))
            .bind('dragend', this.onDragEnd.bind(this));
        //$('a[href^=#]').click(function(){
        //    console.log('click');
        //}.bind(this));
    },
    unbind: function() {
        this.hammer.unbind('drag');
        this.hammer.unbind('dragend');
    }

}
