function arrowScroll(left, amount, element){
    let content = document.querySelector(element);
    let scrollAmount = 0;
    let scrollMax = content.clientWidth;
    let scrollMin = 0;
    if(left){
        sideScroll(content, 'left', 10,amount,10);
        
    } else {
        sideScroll(content, 'right', 10,amount,10);
    }
}

function sideScroll(element,direction,speed,distance,step){
    let scrollAmount = 0;
    let slideTimer = setInterval(function(){
        if(direction === 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}