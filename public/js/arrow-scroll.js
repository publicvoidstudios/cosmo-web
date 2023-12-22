function arrowScroll(left, amount, element){
    let content = document.querySelector(element);
    if(left){
        sideScroll(content, 'left', 10,amount,10);
        console.log(`Scrolling left. Element: ${element}. Content: ${content}.`);
    } else {
        sideScroll(content, 'right', 10,amount,10);
        console.log(`Scrolling right. Element: ${element}. Content: ${content}.`);
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