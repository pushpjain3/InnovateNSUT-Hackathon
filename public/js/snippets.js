// Configure carousel Slider
$(".carousel").carousel({
  interval: 4000
});

// Slick Slider
$(".slider").slick({
  infinite: true,
  slideToShow: 1,
  slideToScroll: 1,
});

// z-index of card
document.querySelector('#services').addEventListener('mousemove', function(e) {
  if(e.target.classList.contains('card-body')) {
    e.target.lastChild.previousElementSibling.style.zIndex = 1
  }
});