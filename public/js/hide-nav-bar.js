let prevScrollPos = window.scrollY;

window.onscroll = function () {
    let currentScrollPos = window.scrollY;
    
    if(prevScrollPos > currentScrollPos){
        document.querySelector('header').style.top = '0';
    } else {
        document.querySelector('header').style.top = '-120px'
    }
    
    prevScrollPos = currentScrollPos;
}