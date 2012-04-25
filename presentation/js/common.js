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

             var app = new Desplazar($('#canvas'), { direction: Desplazar.VERTICAL });
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
		imageBtnPrev: 'assets/gallery/prev_min.png',
		imageBtnNext: 'assets/gallery/next_min.png',
		imageBtnClose: 'assets/gallery/close_min.png'
	});
});
