let popUp;

popUp = document.querySelector('.pop-up');
/*Update onclick event for popup button*/
popUp.querySelector('span').onclick = () => {
    /*hide popup on span click*/
    popUp.style.display = 'none';
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        /*Display popup on item click*/
        popUp.style.display = 'flex';
        /*Attach heading*/
        popUp.querySelector('.pop-up-name').innerHTML = item.querySelector('.item-name').innerHTML;
        /*Attach text*/
        popUp.querySelector('.pop-up-text').innerHTML = item.querySelector('.info').innerHTML;
    });
});