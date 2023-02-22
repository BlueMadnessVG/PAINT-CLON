var canvas = document.getElementById("canvas");
const rContext = canvas.getContext("2d");
var canvaspreview = document.getElementById("canvas-preview");
const rContextpreview = canvaspreview.getContext("2d");

var Figures = new Array().fill(null);
var R = 10;
var a = 20, b = 10;

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

var struct = makeStruct("level,color,Layer");

var draw = true;
var X1, X2, Y1, Y2;

//TOMA EL PRIMER VALOR PARA HACER UN PREVIEW
canvas.addEventListener( "mousedown", function(event){
  rContext.save();
  X1 = event.offsetX;
  Y1 = event.offsetY;

  for(i = 0; i < Figures.length; i++) {
    if( Figures[i].Layer[X1][Y1] ){
      for( y = 0; y < canvas.height; y++ ){
        for( x = 0; x < canvas.width; x++ ){
          if ( Figures[i].Layer[x][y] ){
            selectPixel(x, y);
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
    var prueba = new struct( 1,"255, 165, 0, 1", new Array(canvas.width).fill(false).map( () => new Array(canvas.height).fill(false) ) );
    Figures.push( prueba );
  }

  drawElipse(X1, Y1, a, b);
  //drawBresenham(X1, X2, Y1, Y2);
  
  console.log(Figures);
  X1 = null; X2 = null; Y1 = null; Y2 = null; R = 10; a = 20; b = 10;

  rContextpreview.clearRect(0, 0, canvas.width, canvas.height);
  rContext.restore();
});

//MUESTRA EL PREVIEW Y DIBUJA LAS LIENAS
canvas.addEventListener( "mousemove", function(event){

  if( !draw ) {
  
    rContextpreview.setTransform(1,0,0,1,0,0);
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);


    /* console.log( X2 + "  " + Y2 +  " " + R);
    if( (X2 > event.offsetX || Y2 < event.offsetY)  && R >= 11 ) {
      R--;
      drawTrigonometricCircle(X1, Y1, R);
    }else if( ( X2 < event.offsetX || Y2 > event.offsetY) ){
      R++;
      drawTrigonometricCircle(X1, Y1, R);
    }else {
      drawTrigonometricCircle(X1, Y1, R);
    } */

    if( X2 > event.offsetX ) {
      a--;
    }else if( X2 < event.offsetX ){
      a++;
    }
    else if( Y2 > event.offsetY ) {
      b--;
    }
    else if( Y2 < event.offsetY ) {
      b++;
    }

    drawElipse(X1, Y1, a, b);
    X2 = event.offsetX;
    Y2 = event.offsetY;
    


    //drawBresenham(X1, X2, Y1, Y2);

/*     Y3 = Y1 + ( X2 - X1 );

    drawBresenham( X1, X1, Y1, Y3 );
    drawBresenham( X2, X2, Y1, Y3 );
    drawBresenham( X1, X2, Y3, Y3 ); */

  }

} );

function drawpix(x,y){

    if(draw){
      //Figures[Figures.length - 1].Layer[x][y] = true;
      rContext.fillRect(x,y,1,1);
    }
    else {
      rContextpreview.fillRect(x,y,1,1);
    }
}
  
function selectPixel(x, y){
    rContext.beginPath();
    rContext.strokeStyle = "rgba("+ Figures[0].color +")";
    rContext.moveTo(x,y);
    rContext.lineTo(x+1,y+1);
    rContext.closePath();
    rContext.stroke();
}