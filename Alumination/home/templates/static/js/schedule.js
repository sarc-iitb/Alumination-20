$(document).ready(function(){ 
    $('.main').click(function(){
        $(".buttom").removeClass('power');
        $(".main").removeClass('opener');
        $(".main").addClass('opener-next');
        $(".a2").addClass('power2');
        $(".a1").addClass('power1');
        $(".a0").addClass('power0');
        });

    $('.buttom2').click(function(){
        $(".a2").removeClass('power2');
        });

    $('.buttom1').click(function(){
        $(".a1").removeClass('power1');
        });

    $('.buttom0').click(function(){
        $(".a0").removeClass('power0');
        });

});
 var cardopener = anime({
            targets: '.buttom',
            translateX: anime.stagger([-120, 120]),
            //translateY: anime.stagger([-100,50]),
            rotate: {
                value: anime.stagger([-420,60])
            },
            
            duration: 2000,
            // loop: true,
            autoplay: false,
            delay: anime.stagger(50)
        });
        var allSquares22 = document.querySelector(".main");
//allSquares[allSquares.length - 1].onclick = cardstagger.play;
allSquares22.onclick=cardopener.play;
var cardstagger2 = anime({
    targets: '.a2',
    translateX: -250,
    // translateY: anime.stagger([50, 100 ,50]),
    rotate: {
        value: anime.stagger([-150, 30])
    },
    scale: 3,
    duration: 2000,
    // loop: true,
    autoplay: false,
    delay: anime.stagger(50)
});
var allSquares2 = document.querySelector(".buttom2");
//allSquares[allSquares.length - 1].onclick = cardstagger.play;
allSquares2.onclick=cardstagger2.play;

var cardstagger1 = anime({
    targets: '.a1',
    translateX: 250,
    // translateY: anime.stagger([50, 100 ,50]),
    rotate: {
        value: anime.stagger([-30, 150])
    },
    scale: 3,
    duration: 2000,
    // loop: true,
    autoplay: false,
    delay: anime.stagger(50)
});
var allSquares1 = document.querySelector(".buttom1");
//allSquares[allSquares.length - 1].onclick = cardstagger.play;
allSquares1.onclick=cardstagger1.play;

var cardstagger0 = anime({
    targets: '.a0',
    translateY: 400,
    
    // translateY: anime.stagger([50, 100 ,50]),
    rotate: 0,
    scale: 3,
    duration: 2000,
    // loop: true,
    autoplay: false,
    delay: anime.stagger(50)
});
var allSquares0 = document.querySelector(".buttom0");
//allSquares[allSquares.length - 1].onclick = cardstagger.play;
allSquares0.onclick=cardstagger0.play;

$(document).ready(function(){ 
    $('.a').click(function(){
        var id;
        id = $(this).attr('rel');
        if($('#'+id).hasClass('bg1')||$('#'+id).hasClass('bg2')){
            $('#'+id).siblings().removeClass('bg1');
            $('#'+id).siblings().removeClass('bg2');
            $('#'+id).removeClass('bg1');
            $('#'+id).removeClass('bg2');
            $('#'+id).removeClass('flip-card');
            $('#'+id).addClass('square');
            $('#'+id).siblings().addClass('square');
            $('#'+id).siblings().children().removeClass('flip-card-inner');
            $('#'+id).siblings().children().addClass('flip-card-inner1');
            $('#'+id).children().removeClass('flip-card-inner'); 
            $('#'+id).children().addClass('flip-card-inner1'); 
            $('#'+id).siblings().removeClass('flip-card');
            var id1;
            id1 = $(".face");
            id1.removeClass('square-face-open');
            id1.addClass('square-face');
            id1.removeClass('face');
            
                //if(!($(".type1").children().children().children().hasClass('text1'))){
                    //$(".type1").children().children().children().addClass('text1');
                //}
                //if(!($(".type6").children().children().children().hasClass('text6'))){
                   // $(".type6").children().children().children().addClass('text6');
            //}
            let cardstagger5 = anime({
                targets: '.a2',
                translateX: -250,
                // translateY: anime.stagger([50, 100 ,50]),
                rotate: {
                    value: anime.stagger([-150, 30])
                },
                scale: 3,
                duration: 2000,
                // loop: true,
                autoplay: true,
                delay: anime.stagger(50)
            });

            let cardstagger4 = anime({
                targets: '.a1',
                translateX: 250,
                // translateY: anime.stagger([50, 100 ,50]),
                rotate: {
                    value: anime.stagger([-30, 150])
                },
                scale: 3,
                duration: 2000,
                // loop: true,
                autoplay: true,
                delay: anime.stagger(50)
            });
            //allSquares[allSquares.length - 1].onclick = cardstagger.play

            let cardstagger3 = anime({
                targets: '.a0',
                translateY: 400,
            
                // translateY: anime.stagger([50, 100 ,50]),
                rotate: 0,
                scale: 3,
                duration: 2000,
                // loop: true,
                autoplay: true,
                delay: anime.stagger(50)
            });
            cardopener.play();
            
        }
        else {
            $('#'+id).removeClass('square');
            $('#'+id).addClass('bg2');
            $('#'+id).addClass('flip-card');
            $('#'+id).removeClass('bg1');
            //if($('#'+id).children().children().children().hasClass('text1')){
                //$('#'+id).children().children().children().removeClass('text1');
            //}
            //if($('#'+id).children().children().children().hasClass('text6')){
                //$('#'+id).children().children().children().removeClass('text6');
            //}

            $('#'+id).siblings().removeClass('square');
            $('#'+id).siblings().addClass('bg1');
            $('#'+id).siblings().removeClass('flip-card');
            $('#'+id).siblings().children().removeClass('flip-card-inner');
            $('#'+id).siblings().children().addClass('flip-card-inner1');
            $('#'+id).siblings().removeClass('bg2');
            $('#'+id).children().removeClass('flip-card-inner1'); 
            $('#'+id).children().addClass('flip-card-inner');
            $('#'+id).children().children().find("img").removeClass('square-face');
            $('#'+id).children().children().find("img").addClass('square-face-open'); 
            $('#'+id).children().children().find("img").addClass('face');     

            let animateAll1 = anime({
                targets: "."+id,
                rotate: {
                    value: 360,
                    duration: 1800,                                                                                             
                    easing: 'easeInOutSine'
                },
                scale: {
                    value: 7,
                    duration: 1600,
                    delay: 800,
                    easing: 'easeInOutQuart'
                },
                autoplay: true,
                translateX: 0,
                translateY:0
            });
    }
});      
   });