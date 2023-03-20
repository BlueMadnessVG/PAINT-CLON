var canvas = document.getElementById("canvas");
const rContext = canvas.getContext("2d");
var canvaspreview = document.getElementById("canvas-preview");
const rContextpreview = canvaspreview.getContext("2d");
var btnCanvas = document.getElementById("canvas-btn");
const btnContext = canvaspreview.getContext("2d");

const buttons = document.querySelectorAll(".shapes");
const configButtons = document.querySelectorAll(".config");
const menuButtons = document.querySelectorAll(".menu-btn");

var slider = document.getElementById("myRange");
var output = document.getElementById("border");
var menu = document.getElementById("menu");

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

var borderColor = document.getElementById("borderColor");

var Figures = new Array().fill(null);
var R = 0, S = 3;
var a = 0, b = 0;
var type = ""; 

//Struct of the figures
function makeStruct( names ) {
  var names = names.split(',');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++){
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

var struct = makeStruct("type,sp1,sp2,a,b,n,border,backgroundColor,borderColor,Layer");

var draw = true;
var move = false;
var resize = false;
var index;
var X1, X2, Y1, Y2, aux1, aux2;


function drawFigure( type ) {

  if( type != undefined ) {

    switch (type) {
  
      case 'line':
        if( X2 != null || Y2 != null )
          drawBresenham(X1, X2, Y1, Y2);
        break;
      case 'ellipse':
        if( a != 0 || b != 0){
          drawElipse(X1, Y1, a, b);
        }
        break;
      case 'shapes':
        if( a != 0){
          drawTrigonometric(X1, Y1, a, S);  
        }
      break;
    }

  }

}

window.addEventListener("contextmenu", e => e.preventDefault());

function newab(offsetX, offsetY) {

  if( X2 > offsetX ) {
    a += X2 - offsetX;
  }else if( X2 < offsetX ){
    a -= offsetX - X2;
  }
  else if( Y2 > offsetY ) {
    b += Y2 - offsetY;
  }
  else if( Y2 < offsetY ) {
    b -= offsetY - Y2;
  }

}

//TOMA EL PRIMER VALOR PARA HACER UN PREVIEW
canvas.addEventListener( "mousedown", function(event){

  event.preventDefault();
  X1 = event.offsetX;
  Y1 = event.offsetY;
  S = document.getElementsByClassName("input-btn")[0].value;

  if( event.button == 2  ){

    for(i = 0; i < Figures.length; i++) {
      if( Figures[i].Layer[X1][Y1] ){

        menu.style.display = "flex";
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px"

        for( y = 0; y < canvas.height; y++ ){
          for( x = 0; x < canvas.width; x++ ){
            if ( Figures[i].Layer[x][y] ){
              index = i;
              selectPixel(x, y, i);
            }
          }
        }
        i = Figures.length;
      }
      else {
        menu.style.display = "none";
      }
    }

  }
  else {

    if( document.getElementsByClassName("activeC")[0] != undefined ){
      configCanvas();
    }
    else {
      draw = false;
    }

      rContext.fillStyle = borderColor.value;
      rContextpreview.fillStyle = borderColor.value;
    }
  
});

//CIERRA EL PREVIEW DEL CANVAS
canvas.addEventListener( "mouseup", function( event ) {

  if( !draw ){
    
    draw = true;
    type = document.getElementsByClassName("activeS")[0].id;

    if ( X2 != undefined ) {
      var prueba = new struct( type, [X1,Y1], [X2,Y2], a, b, S, slider.value, "0, 0, 0, 0",borderColor.value, new Array(canvas.width).fill(false).map( () => new Array(canvas.height).fill(false) ) );
      Figures.push( prueba );
    }
  
    drawFigure( type );
    
    console.log(Figures);
    X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0;
  
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

  }
  else if( move ){

    move = false;

    Figures[index].sp1 = [X1, Y1];
    Figures[index].sp2 = [X2, Y2];
    Figures[index].Layer = new Array(canvas.width).fill(false).map( () => new Array(canvas.height).fill(false) );

    drawFigure( Figures[index].type );
    console.log(Figures);

    X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0; index = undefined;
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

  }


});

//MUESTRA EL PREVIEW Y DIBUJA LAS LIENAS
canvas.addEventListener( "mousemove", function(event){

  if( !draw ) {
  
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

    newab(event.offsetX, event.offsetY);

    X2 = event.offsetX;
    Y2 = event.offsetY;

    drawFigure( document.getElementsByClassName("activeS")[0].id );

  }
  else if( move ) {

    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

    aux1 = event.offsetX;
    aux2 = event.offsetY;

    var dx = aux1 - X1;
    var dy = aux2 - Y1;

    X1 += dx;
    X2 += dx;
    Y1 += dy;
    Y2 += dy;

    drawFigure( Figures[index].type );

  }

} );

function drawpix(x,y){
    x = Math.round(x);
    y = Math.round(y);

    if( index != undefined && (!move || !resize ) ){
      Figures[index].Layer[x][y] = true;
      rContext.fillRect(x,y,slider.value,slider.value);
    }else if( draw && index == undefined ){
      Figures[Figures.length - 1].Layer[x][y] = true;
      rContext.fillRect(x,y,slider.value,slider.value);
    }
    else {
      rContextpreview.fillRect(x,y,slider.value,slider.value);
    }
}
  
function selectPixel(x, y, L){
    rContext.fillStyle = "rgba(63,81,181,255)";
    rContext.fillRect(x,y, Figures[L].border, Figures[L].border);
}