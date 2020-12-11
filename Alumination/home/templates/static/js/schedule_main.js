//Function to simulate an event
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

//Function to activate 3D gallery
function activateGallery() {
	$('#dg-container').gallery();
	var currentVal = 0;
	$('a.DayLink').click(function(){
		if($(this).attr("id") == "Day0" || $(this).attr("id") == "day00"){
			if(currentVal == 1){
				eventFire(document.getElementById('prevSlide'), 'click');
				currentVal = 0;
			} else if (currentVal == 2) {
				eventFire(document.getElementById('nextSlide'), 'click');
				currentVal = 0;
			}
		} else if($(this).attr("id") == "Day1" || $(this).attr("id") == "day01"){
			if(currentVal == 0){
				eventFire(document.getElementById('nextSlide'), 'click');
				currentVal = 1;
			} else if (currentVal == 2){
				eventFire(document.getElementById('prevSlide'), 'click');
				currentVal = 1;
			}
		} else{
			if(currentVal == 0){
				eventFire(document.getElementById('prevSlide'), 'click');
				currentVal = 2;
			} else if(currentVal == 1){
				eventFire(document.getElementById('nextSlide'), 'click');
				currentVal = 2;
			}
		}
	});
}



var scheduleSection = 'gallery';


$(document).ready(function(){
	var win = $(window);
	if (win.width() < 1024) {
		$('#myGallery').addClass("hidden");
		$('#galleryButtons').addClass("hidden");
    	scheduleSection = 'carousel';
  	} 
  	else {
  		$('#myCarousel').addClass("hidden");
  		$('#controlButtons').addClass("hidden");
  		activateGallery();
  	}	
});	

//Changing DOM structure on changing screen width
$(window).on('resize', function() {
  var win = $(this);
  if (win.width() < 1024) {
    if (scheduleSection == 'gallery'){
    	$('#myGallery').addClass("hidden");
		$('#galleryButtons').addClass("hidden");
    	scheduleSection = 'carousel';
    	$('#myCarousel').removeClass("hidden");
    	activateCarousel();
    }
  } else {
  	if (scheduleSection == 'carousel') {
  		$('#myCarousel').addClass("hidden");
  		$('#myGallery').removeClass("hidden");
  		$('#galleryButtons').removeClass("hidden");
  		scheduleSection = 'gallery';
  		activateGallery();

  	}
  }
});
