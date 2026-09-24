// console.log("1111111");


const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});