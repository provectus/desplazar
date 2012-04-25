var myScroll;
function loaded() {
//	myScroll = new iScroll('iscroll');
}
//document.addEventListener('DOMContentLoaded', loaded, false);

         var toggle;
         $(function() {

             toggle = function() {
 				var ele = document.getElementById("more-details");
  			if(ele.style.display == "block") {
                     ele.style.display = "none";
                     app.bind();
		    	} else {
                     ele.style.display = "block";
                     app.unbind();
 				}
  		};

             //document.getElementById('content').webkitRequestFullScreen();

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
             //app.bind();
             //new iScroll('iscroll');

             //$('#canvas > ul > li').each(function(idx, item) {
             //    new Desplazar($(item), { direction: Desplazar.HORIZONTAL });
             //});
	$('#publicy-held-company a').lightBox({
		imageBtnPrev: 'assets/gallery/prev_min.png',
		imageBtnNext: 'assets/gallery/next_min.png'
	});
	
	$('.gallery-wrap a').lightBox({
		imageBtnPrev: 'assets/gallery/prev-min1.png',
		imageBtnNext: 'assets/gallery/next-min1.png',
		imageBtnClose: 'assets/gallery/close_min.png'
	});
});
