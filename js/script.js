//Active Link
$('header .navbar-nav a').on('click', function () {
    $('header .navbar-nav').find('li.active').removeClass('active');
    $(this).parent('li').addClass('active');
});

//Tutorial
(function($) {
    var $window = $(window);
    
    $.fn.isVisible = function(){
      var $this = $(this),
        Left = $this.offset().left,
        visibleWidth = $window .width();
  
      return Left < visibleWidth;  
    }
  })(jQuery);
  
  (function($){
    var list = $('.portfolio-items'),
        showVisibleItems = function(){
        list.children('.item:not(.falldown)').each(function(el, i){
            var $this = $(this);
            if($this.isVisible()){
              $this.addClass('falldown');
            }
          });
        };
    
    //initially show all visible items before any scroll starts
    showVisibleItems();
    
    //then on scroll check for visible items and show them
    list.scroll(function(){
      showVisibleItems();
    });
    
    //image hover pan effect
    list.on('mousemove','img', function(ev){
        var $this = $(this),
            posX = ev.pageX, 
            posY = ev.pageY,
            data = $this.data('cache');
      //cache necessary variables
          if(!data){
            data = {};
            data.marginTop = - parseInt($this.css('top')),
            data.marginLeft = - parseInt($this.css('left')),
            data.parent = $this.parent('.viewtutor'),
            $this.data('cache', data); 
          }
  
      var originX = data.parent.offset().left,
          originY =  data.parent.offset().top;
      
         //move image
         $this.css({
            'left': -( posX - originX ) / data.marginLeft,
            'top' : -( posY - originY ) / data.marginTop
         }); 
    });
    
    
    list.on('mouseleave','.item', function(e){
      $(this).find('img').css({
        'left': '0', 
        'top' : '0'
      });
    });
    
    //add mouse wheel support with the jquery.mousewheel plugin
    list.mousewheel(function(event, delta) {
  
        this.scrollLeft -= (delta * 60);
      
        event.preventDefault();
  
     });
    
  })(jQuery);

//Gallery
(function () {
    var support = { transitions: Modernizr.csstransitions },
        // transition end event name gallery
        transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        onEndTransition = function (el, callback) {
            var onEndCallbackFn = function (ev) {
                if (support.transitions) {
                    if (ev.target != this) return;
                    this.removeEventListener(transEndEventName, onEndCallbackFn);
                }
                if (callback && typeof callback === 'function') { callback.call(this); }
            };
            if (support.transitions) {
                el.addEventListener(transEndEventName, onEndCallbackFn);
            }
            else {
                onEndCallbackFn();
            }
        };

    new GridFx(document.querySelector('.grid'), {
        imgPosition: {
            x: -0.5,
            y: 1
        },
        onOpenItem: function (instance, item) {
            instance.items.forEach(function (el) {
                if (item != el) {
                    var delay = Math.floor(Math.random() * 50);
                    el.style.WebkitTransition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), -webkit-transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
                    el.style.transition = 'opacity .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1), transform .5s ' + delay + 'ms cubic-bezier(.7,0,.3,1)';
                    el.style.WebkitTransform = 'scale3d(0.1,0.1,1)';
                    el.style.transform = 'scale3d(0.1,0.1,1)';
                    el.style.opacity = 0;
                }
            });
        },
        onCloseItem: function (instance, item) {
            instance.items.forEach(function (el) {
                if (item != el) {
                    el.style.WebkitTransition = 'opacity .4s, -webkit-transform .4s';
                    el.style.transition = 'opacity .4s, transform .4s';
                    el.style.WebkitTransform = 'scale3d(1,1,1)';
                    el.style.transform = 'scale3d(1,1,1)';
                    el.style.opacity = 1;

                    onEndTransition(el, function () {
                        el.style.transition = 'none';
                        el.style.WebkitTransform = 'none';
                    });
                }
            });
        }
    });
})();

//Scroll Reveal
window.sr = ScrollReveal({ reset: true });
sr.reveal('.navbar', {
    duration: 2000,
    origin: 'bottom'
});
sr.reveal('h2', {
    duration: 2000,
    origin: 'bottom',
    distance: '20px'
});
sr.reveal('#about .aboutlist-1', {
    duration: 1000,
    origin: 'left',
    delay: 1000,
    distance: '300px'
});
sr.reveal('#about .aboutlist-2', {
    duration: 1000,
    origin: 'bottom',
    delay: 2000,
    distance: '300px'
});
sr.reveal('#about .aboutlist-3', {
    duration: 1000,
    origin: 'right',
    delay: 3000,
    distance: '300px'
});
sr.reveal('.list-1', {
    duration: 1000,
    origin: 'bottom',
    delay: 1000
});
sr.reveal('.list-2', {
    duration: 1000,
    origin: 'bottom',
    delay: 1500
});
sr.reveal('.list-3', {
    duration: 1000,
    origin: 'bottom',
    delay: 2000
});
sr.reveal('.list-4', {
    duration: 1000,
    origin: 'bottom',
    delay: 2500
});
sr.reveal('#contact .list-1', {
    duration: 1000,
    origin: 'left',
    delay: 1000
});
sr.reveal('#contact .list-2', {
    duration: 1000,
    origin: 'left',
    delay: 1500
});
sr.reveal('#contact .list-3', {
    duration: 1000,
    origin: 'left',
    delay: 2000
});
sr.reveal('#contact .list-4', {
    duration: 1000,
    origin: 'right',
    delay: 2500
});
sr.reveal('#tutorial .portfolio-items', {
    duration: 1000,
    origin: 'top',
    delay: 1000
});

$(function () {
    // Smooth Scrolling
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});