var canvas = document.getElementById("canvas");
const rContext = canvas.getContext("2d");
var canvaspreview = document.getElementById("canvas-preview");
const rContextpreview = canvaspreview.getContext("2d");
var btnCanvas = document.getElementById("canvas-btn");
const btnContext = canvaspreview.getContext("2d");

const buttons = document.querySelectorAll(".shapes");

var slider = document.getElementById("myRange");
var output = document.getElementById("border");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

var borderColor = document.getElementById("borderColor");

var Figures = new Array().fill(null);
var R = 0;
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

var struct = makeStruct("type,sp1,sp2,a,b,border,backgroundColor,borderColor,Layer");

var draw = true;
var X1, X2, Y1, Y2;

buttons.forEach(btn => {
  btn.addEventListener("click", function(event) {

    buttons.forEach(btnClass => {
      btnClass.classList.remove("active");
    });
  
    btn.classList.add("active");

  });
})



function drawFigure() {

  type = document.getElementsByClassName("active")[0].id;

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
        var S = document.getElementsByClassName("input-btn")[0].value;
        drawTrigonometric(X1, Y1, a, S);  
      }
    break;
  }

}

//TOMA EL PRIMER VALOR PARA HACER UN PREVIEW
canvas.addEventListener( "mousedown", function(event){
  rContext.save();
  X1 = event.offsetX;
  Y1 = event.offsetY;

  console.log(buttons);

  rContext.fillStyle = borderColor.value;
  rContextpreview.fillStyle = borderColor.value;

  for(i = 0; i < Figures.length; i++) {
    if( Figures[i].Layer[X1][Y1] ){
      for( y = 0; y < canvas.height; y++ ){
        for( x = 0; x < canvas.width; x++ ){
          if ( Figures[i].Layer[x][y] ){
            selectPixel(x, y, i);
          }
        }
      }
      i = Figures.length;
    }
  }

  draw = false;
  
});

//CIERRA EL PREVIEW DEL CANVAS
canvas.addEventListener( "mouseup", function( event ) {
  draw = true;

  if ( X2 != undefined ) {
    var prueba = new struct( type, [X1,Y1], [X2,Y2], a, b, slider.value, "0, 0, 0, 0","63,81,181,255", new Array(canvas.width).fill(false).map( () => new Array(canvas.height).fill(false) ) );
    Figures.push( prueba );
  }

  drawFigure();
  
  console.log(Figures);
  X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0;

  rContextpreview.clearRect(0, 0, canvas.width, canvas.height);
  rContext.restore();
});

//MUESTRA EL PREVIEW Y DIBUJA LAS LIENAS
canvas.addEventListener( "mousemove", function(event){

  if( !draw ) {
  
    rContextpreview.setTransform(1,0,0,1,0,0);
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

    if( X2 > event.offsetX ) {
      a += X2 - event.offsetX;
    }else if( X2 < event.offsetX ){
      a -= event.offsetX - X2;
    }
    else if( Y2 > event.offsetY ) {
      b += Y2 - event.offsetY;
    }
    else if( Y2 < event.offsetY ) {
      b -= event.offsetY - Y2;
    }

    X2 = event.offsetX;
    Y2 = event.offsetY;

    drawFigure();

  }

} );

function drawpix(x,y){
    x = Math.round(x);
    y = Math.round(y);
    if(draw){
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