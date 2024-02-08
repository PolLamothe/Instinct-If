function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

$('#souris_photo').hover(function() {
    this.style.left = getRandomInt(80)+10+"vw" ;
    this.style.top =getRandomInt(80)+10+"vh" ;
})

var draggable = document.getElementById('draggable');

var posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

draggable.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

function mouseDown(e) {
  e.preventDefault();
  posX = e.clientX - draggable.offsetLeft;
  posY = e.clientY - draggable.offsetTop;
  window.addEventListener('mousemove', moveElement, false);
}

function mouseUp() {
  window.removeEventListener('mousemove', moveElement, false);
}

function moveElement(e) {
  $('#draggable').css("opacity","100%")
  mouseX = e.clientX - posX;
  mouseY = e.clientY - posY;
  draggable.style.left = mouseX + 'px';
  draggable.style.top = mouseY + 'px';
  console.log(draggable.offsetLeft)
  if ((draggable.offsetLeft+draggable.offsetWidth >= $('#souris_photo').offset().left && draggable.offsetLeft <= $('#souris_photo').offset().left+$("#souris_photo").width()) && (draggable.offsetTop+draggable.offsetHeight >= $('#souris_photo').offset().top && draggable.offsetTop <= $('#souris_photo').offset().top+$("#souris_photo").height()) ){
    $('#wolf').css("left",draggable.style.left)
    $('#wolf').css("top",draggable.style.top)
    $('#wolf').css("display","inline")
    draggable.remove()
    $('#souris_photo').remove()
    $("h1").css("display","inline")
  }
}

document.getElementById('background').ondragstart = function() { return false; };