$( function(){
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
})
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
