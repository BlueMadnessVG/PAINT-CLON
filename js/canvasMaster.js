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
var move = true;
var index = 0;
var X1, X2, Y1, Y2, aux1, aux2;

function redrawCanvas() {

  for(i = 0; i < Figures.length; i++) {
    console.log(move + "    " + (index != i));
    if( move ){

      for( y = 0; y < canvas.height; y++ ){
        for( x = 0; x < canvas.width; x++ ){
          if ( Figures[i].Layer[x][y] ){
            redrawPixel(x, y, i);
          }
        }
      }

    }
    else if( index != i ){
      for( y = 0; y < canvas.height; y++ ){
        for( x = 0; x < canvas.width; x++ ){
          if ( Figures[i].Layer[x][y] ){
            redrawPixel(x, y, i);
          }
        }
      }

    }
  }

}

function menuDisplayNone() {

  menu.style.display = "none";
  for(i = 0; i < Figures.length; i++) {
    console.log(i);
    for( y = 0; y < canvas.height; y++ ){
      for( x = 0; x < canvas.width; x++ ){
        if ( Figures[i].Layer[x][y] ){
          redrawPixel(x, y, i);
        }
      }
    }
  }

}

function moveFigure(Newindex) {

  const element = Figures.splice(index, 1)[0];
  Figures.splice(Newindex, 0, element);
  console.log(Figures);

}

menuButtons.forEach(btn => {
  btn.addEventListener("click", function(event) {
    switch (btn.id) {
      case 'moveUp':
        if( index != Figures.length - 1 ){
          moveFigure(index + 1);
          redrawCanvas();
        }
        menuDisplayNone();

        break;
      case 'moveDown':

        if( index != 0 ){
          moveFigure(index - 1);
          redrawCanvas();
        }
        menuDisplayNone();

        break;
      case 'clear':

        Figures.splice(index, 1);
        console.log(Figures);

        rContext.clearRect(0, 0, canvas.width, canvas.height);

        redrawCanvas();
        menuDisplayNone();

        break;
    }

  });
})

buttons.forEach(btn => {
  btn.addEventListener("click", function(event) {

    buttons.forEach(btnClass => {
      btnClass.classList.remove("activeS");
    });
    configButtons.forEach(btnClass => {
      btnClass.classList.remove("activeC");
    });
  
    btn.classList.add("activeS");

  });
})

configButtons.forEach(btns => {
  btns.addEventListener("click", function(event) {

    buttons.forEach(btnClass => {
      btnClass.classList.remove("activeS");
    });
    configButtons.forEach(btnClass => {
      btnClass.classList.remove("activeC");
    });
  
    btns.classList.add("activeC");

  });
})

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
          var S = document.getElementsByClassName("input-btn")[0].value;
          drawTrigonometric(X1, Y1, a, S);  
        }
      break;
    }

  }

}

function configCanvas() {

  type = document.getElementsByClassName("activeC")[0].id;

  switch(type){

    case 'move':
      for(i = 0; i < Figures.length; i++) {
        if( Figures[i].Layer[X1][Y1] ){

          move = false;
          X1 = Figures[i].sp1[0]; X2 = Figures[i].sp2[0]; Y1 = Figures[i].sp1[1]; Y2 = Figures[0].sp2[1];
          aux1 = X1;
          aux2 = Y1;

          if( Figures[i].type == "shapes" || Figures[i].type == "ellipse" ){
            a = Figures[i].a;
            b = Figures[i].b;
          }

          index = i;
          console.log(Figures[index]);
          i = Figures.length;

          rContext.clearRect(0, 0, canvas.width, canvas.height);

        }
      }
      break;

    case 'color':

      for(i = 0; i < Figures.length; i++) {
        if( Figures[i].Layer[X1][Y1] ){
          if( Figures[index].borderColor != borderColor.value ){
            Figures[index].borderColor = borderColor.value;
          }
          redrawCanvas();
        }
      }
      break;

  }

}

window.addEventListener("contextmenu", e => e.preventDefault());

//TOMA EL PRIMER VALOR PARA HACER UN PREVIEW
canvas.addEventListener( "mousedown", function(event){

  event.preventDefault();
  X1 = event.offsetX;
  Y1 = event.offsetY;

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
      var prueba = new struct( type, [X1,Y1], [X2,Y2], a, b, slider.value, "0, 0, 0, 0",borderColor.value, new Array(canvas.width).fill(false).map( () => new Array(canvas.height).fill(false) ) );
      Figures.push( prueba );
    }
  
    drawFigure( type );
    
    console.log(Figures);
    X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0;
  
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

  }
  else if( !move ){

    canvas.style.cursor = "default";
    move = true;

    Figures[index].sp1 = [X1, Y1];
    Figures[index].sp2 = [X2, Y2];
    drawFigure( Figures[index].type );
    console.log(Figures);

    X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0;
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

  }


});

//MUESTRA EL PREVIEW Y DIBUJA LAS LIENAS
canvas.addEventListener( "mousemove", function(event){

  if( !draw ) {
  
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

    drawFigure( document.getElementsByClassName("activeS")[0].id );

  }
  else if( !move ) {

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
    if( (draw && move) ){
      Figures[Figures.length - 1].Layer[x][y] = true;
      rContext.fillRect(x,y,slider.value,slider.value);
    }
    else {
      rContextpreview.fillRect(x,y,slider.value,slider.value);
    }
}

function redrawPixel( x, y, L ){
  rContext.fillStyle = Figures[L].borderColor;
  rContext.fillRect(x, y, Figures[L].border, Figures[L].border);
}
  
function selectPixel(x, y, L){
    rContext.fillStyle = "rgba(63,81,181,255)";
    rContext.fillRect(x,y, Figures[L].border, Figures[L].border);
}