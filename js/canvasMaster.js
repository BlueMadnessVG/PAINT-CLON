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
var backgroundColor = document.getElementById("backgroundColor");

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
var fill = false;
var rotate = false;
var index;
var X1, X2, Y1, Y2, aux1, aux2;
var x_medio, y_medio;

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
  menuDisplayNone();
  redrawCanvas();

  event.preventDefault();
  if ( !resize ){
    X1 = event.offsetX;
    Y1 = event.offsetY;
  }
  S = document.getElementsByClassName("input-btn")[0].value;

  if( event.button == 2  ){

    for(i = 0; i < Figures.length; i++) {
      if( Figures[i].Layer[X1][Y1] == 1 || Figures[i].Layer[X1][Y1] == 2 ){

        menu.style.display = "flex";
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px"

        for( y = 0; y < canvas.height; y++ ){
          for( x = 0; x < canvas.width; x++ ){
            if ( Figures[i].Layer[x][y] == 1 || Figures[i].Layer[x][y] == 2 ){
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
    else if( !resize && !rotate ){
      draw = false;
    }

    rContext.fillStyle = borderColor.value;
    rContextpreview.fillStyle = "rgba(63,81,181, 0.1)";

  }
  
});

//CIERRA EL PREVIEW DEL CANVAS
canvas.addEventListener( "mouseup", function( event ) {

  if( !draw ){
    
    draw = true;
    type = document.getElementsByClassName("activeS")[0].id;

    if ( X2 != undefined ) {
      var prueba = new struct( type, [X1,Y1], [X2,Y2], a, b, S, slider.value, "#ffff", borderColor.value, new Array(canvas.width).fill(0).map( () => new Array(canvas.height).fill(0) ) );
      Figures.push( prueba );
      console.log(Figures);
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
    Figures[index].Layer = new Array(canvas.width).fill(0).map( () => new Array(canvas.height).fill(0) );

    drawFigure( Figures[index].type );
    redrawBG();
    console.log(Figures);

    X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0; index = undefined;
    
    rContext.clearRect(0, 0, canvas.width, canvas.height);
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);
    redrawCanvas();

  }
  else if( resize ){

    Figures[index].a = a;
    Figures[index].b = b;
    Figures[index].Layer = new Array(canvas.width).fill(0).map( () => new Array(canvas.height).fill(0) );

    resize = false;

    drawFigure( Figures[index].type );
    redrawBG();
    console.log(Figures);

    X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0; index = undefined;
    
    rContext.clearRect(0, 0, canvas.width, canvas.height);
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);
    redrawCanvas();

  }
  else if ( rotate ){

    console.log(index);
    rotate = false;

  }


});

//MUESTRA EL PREVIEW Y DIBUJA LAS LIENAS
canvas.addEventListener( "mousemove", function(event){
  
  rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

  if( !draw ) {
  
    newab(event.offsetX, event.offsetY);

    X2 = event.offsetX;
    Y2 = event.offsetY;

    drawFigure( document.getElementsByClassName("activeS")[0].id );

  }
  else if( move ) {

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
  else if( resize ) {

    if ( Figures[index].type != 'line' ){

      newab(event.offsetX, event.offsetY);

      X2 = event.offsetX;
      Y2 = event.offsetY;

      drawFigure( Figures[index].type );

    }
    else {

      X2 = event.offsetX;
      Y2 = event.offsetY;

      drawFigure( Figures[index].type );

    }
  }
  else if( rotate ) {

    aux1 = event.offsetX;
    aux2 = event.offsetY;

    var dx = aux1 - x_medio;
    var dy = aux2 - y_medio;

    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    console.log( theta );

    var sin = Math.sin( 45 );
    var cos = Math.cos( 45 );

    var tra = [ [ 1 , 0 , -( 4 ) ],
                [ 0 , 1 , -( 3 ) ], 
                [ 0 , 0 ,  1  ] ];           

    var nrm = [ [ cos, -sin, 0 ],
                [ sin,  cos, 0 ],
                [  0 ,   0 , 1 ] ];

    var trab = [ [ 1 , 0 , 4 ],
                 [ 0 , 1 , 3 ], 
                 [ 0 , 0 ,  1  ] ]; 
    
    var inp = [ 6, 5, 1 ];

    var result = Array(tra.length).fill().map(() => Array(nrm[0].length).fill(0));

    inp = matrixVectorMultiply( tra, inp );
    inp = matrixVectorMultiply( nrm, inp );
    inp = matrixVectorMultiply( trab, inp );

    console.log( inp );

    X2 = (( X2 * cos ) - ( Y2 * sin )) + x_medio;
    Y2 = (( X2 * sin ) + ( Y2 * cos )) + y_medio;

    console.log( X2 + "   " + Y2 );
 
    drawFigure( Figures[index].type );

  }

} );

function matrixVectorMultiply(matrix, vector) {
  // Get the number of rows and columns in the matrix
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Make sure the dimensions of the matrix and vector are compatible
  if (numCols !== vector.length) {
    throw new Error('Matrix and vector dimensions are not compatible');
  }

  // Multiply the matrix by the vector
  const result = matrix.map((row) =>
    row.reduce((sum, value, index) => sum + value * vector[index], 0)
  );

  return result;
}

function savePixel(x, y, figure){

  if( slider.value == 1 ){
    figure.Layer[x][y] = 1;
  }
  else{
    for( NX = 0; NX < slider.value; NX++ ){
      for( NY = 0; NY < slider.value; NY++ ){
        figure.Layer[x + NX][y + NY] = 1;
      }
    }
  }

}

function drawpix(x,y){
    x = Math.round(x);
    y = Math.round(y);

    if( index != undefined && (!move && !resize & !rotate ) ){
      savePixel(x, y, Figures[index]);
      rContext.fillRect(x,y,slider.value,slider.value);
    }else if( draw && index == undefined ){
      savePixel(x, y, Figures[Figures.length - 1]);
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