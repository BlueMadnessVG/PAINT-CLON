var canvas = document.getElementById("canvas");
const rContext = canvas.getContext("2d");
var canvaspreview = document.getElementById("canvas-preview");
const rContextpreview = canvaspreview.getContext("2d");

var Figures = new Array().fill(null);

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
    console.log(Figures[i].Layer[X1][Y1]);

    if( Figures[i].Layer[X1][Y1] ){
      console.log("entro aqui");
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

  drawMidPointCircule(X1, Y1, 10);
  //drawBresenham(X1, X2, Y1, Y2);
  
  console.log(Figures);
  X1 = null; X2 = null; Y1 = null; Y2 = null;

  rContextpreview.clearRect(0, 0, canvas.width, canvas.height);
  rContext.restore();
});
//MUESTRA EL PREVIEW Y DIBUJA LAS LIENAS
canvas.addEventListener( "mousemove", function(event){

  if( !draw ) {

    rContextpreview.setTransform(1,0,0,1,0,0);
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);

    X2 = event.offsetX;
    Y2 = event.offsetY;

    //drawBresenham(X1, X2, Y1, Y2);

/*     Y3 = Y1 + ( X2 - X1 );

    drawBresenham( X1, X1, Y1, Y3 );
    drawBresenham( X2, X2, Y1, Y3 );
    drawBresenham( X1, X2, Y3, Y3 ); */

  }

} );

function drawBresenham(X1, X2, Y1, Y2) {
      // DELTAS DE LA LINEA 
      dY = Math.abs( Y2 - Y1 );
      dX = Math.abs( X2 - X1 );
      // PUNTO DE DECICION
      pX = 2 * dY - dX;
      pY = 2 * dX - dY;
      if ( dY <= dX ) {
        //VERFICICACION DI ES UNA LIENA DE DERECHA A IZQUERDA
        if ( X1 <= X2 ) {
          x = X1;
          y = Y1;
          yend = Y2;
        } else {
          x = X2;
          y = Y2;
          yend = Y1;
        }
        //DUBUJAMOS EL PRIMER PIXEL
        drawpix( x, y );
        //CICLO PARA DIBUJAR LA LINEA
        for ( i = 0; i < dX; i++ ) {
          x++;
          if ( pX < 0 ) {
            pX = pX + (2 * dY);
          }
          else {
            if ( y <= yend ) {
              y += 1;
            } else {
              y -= 1;
            }
            pX = pX + ( 2 * dY ) - ( 2 * dX );
          }
          drawpix( x, y );
        }
      } else {
        //VERIFICAMOS SI LA LINEA ESTA DE ABAJO HACIA ARRIBA
        if ( Y1 <= Y2 ) {
          x = X1;
          y = Y1;
          xend = X2;
        } else {
          x = X2;
          y = Y2;
          xend = X1;
        }

        //DUBUJAMOS EL PRIMER PIXEL
        drawpix( x, y );
        //CICLO PARA DIBUJAR LA LINE
        for ( i = 0; i < dY; i++ ) {
          y += 1;
          if ( pY <= 0 ) {
            pY = pY + ( 2 * dX );
          } else {
            if ( x <= xend ) {
              x += 1;
            } else {
              x -= 1;
            }
            pY = pY + ( 2 * dX ) - ( 2 * dY );
          }
          drawpix( x, y );
        }
      }   
}

function drawMidPoint() {
  console.log(X1 + "   " + Y1 + "  - " + X2 + "   " + Y2);
      // DELTAS DE LA LINEA 
      dY = Math.abs( Y2 - Y1 );
      dX = Math.abs( X2 - X1 );
      // PUNTO DE DECICION
      pX = 2 * dY - dX;
      pY = 2 * dX - dY;
      
      console.log(dY + "   " + dX);
      if ( dY <= dX ) {

        pD = 2 * ( dY - dX );
         //VERFICICACION DI ES UNA LIENA DE DERECHA A IZQUERDA
         if ( X1 <= X2 ) {
          x = X1;
          y = Y1;
          yend = Y2;
        } else {
          x = X2;
          y = Y2;
          yend = Y1;
        }
        //DUBUJAMOS EL PRIMER PIXEL
        console.log(x + "   " + y);
        drawpix( x, y );
        //CICLO PARA DIBUJAR LA LINEA
        for ( i = 0; i < dX ; i++ ) {
          x++;
          if ( pX < 0 ) {
            pX = pX + (2 * dY);
          }
          else {
            if ( y <= yend ) {
              y += 1;
            } else {
              y -= 1;
            }
            pX = pX + pD;
          }
          console.log(x + "   " + y);
          drawpix( x, y );
        }
      } else {
        pD = 2 * ( dX - dY );
        //VERIFICAMOS SI LA LINEA ESTA DE ABAJO HACIA ARRIBA
        if ( Y1 <= Y2 ) {
          x = X1;
          y = Y1;
          xend = X2;
        } else {
          x = X2;
          y = Y2;
          xend = X1;
        }
        //DUBUJAMOS EL PRIMER PIXEL
        console.log(x + "   " + y + "   " + xend);
        drawpix( x, y );
        //CICLO PARA DIBUJAR LA LINE
        for ( i = 0; i < dY; i++ ) {
          y += 1;
          if ( pY <= 0 ) {
            pY = pY + ( 2 * dX );
          } else {
            if ( x <= xend ) {
              x += 1;
            } else {
              x -= 1;
            }
            pY = pY + pD;
          }
          console.log(x + "   " + y);
          drawpix( x, y );
        }
      }
}

function drawDDA() {
  console.log(X1 + "   " + Y1 + "  - " + X2 + "   " + Y2);

  // DELTAS DE LA LINEA 
  dY = Math.abs( Y2 - Y1 );
  dX = Math.abs( X2 - X1 );
  // PUNTO DE DECICION
  pX = dY / dX;
  pY = dX / dY;

  console.log(dY + "   " + dX);
  if ( dY <= dX ) {

    //VERFICICACION DI ES UNA LIENA DE DERECHA A IZQUERDA
    if ( X1 <= X2 ) {
      x = X1;
      y = Y1;
      yend = Y2;
    } else {
      x = X2;
      y = Y2;
      yend = Y1;
    }
    //DUBUJAMOS EL PRIMER PIXEL
    console.log(x + "   " + y + "   " + dY);
    drawpix( x, y );
    for ( i = 0; i < dX; i++ ) {
      if ( pX < 1 ) {
        x = x + 1 ;
        if ( y <= yend ){
          y = y + pX;
        }
        else {
          y = y - pX;
        }
      }
      else if ( pX = 1 ) {
        x = x + 1 ;
        if ( y <= yend ){
          y = y + 1;
        }
        else {
          y = y - 1;
        }
      }
      else {
        x = x + (1/pX);
        if ( y <= yend ){
          y = y + 1;
        }
        else {
          y = y - 1;
        }
      }
      console.log(Math.round( x ) + "   " + Math.round( y ));
      drawpix( Math.round( x ), Math.round( y ) );
    }

  } else {
    
    //VERFICICACION DI ES UNA LIENA DE DERECHA A IZQUERDA
    if ( Y1 <= Y2) {
      x = X1;
      y = Y1;
      xend = X2;
    } else {
      x = X2;
      y = Y2;
      xend = X1;
    }
    //DUBUJAMOS EL PRIMER PIXEL
    console.log(x + "   " + y + "   " + dY);
    drawpix( x, y );
    for ( i = 0; i < dY; i++ ) {
      if ( pY < 1 ) {
        y = y + 1 ;
        if ( x <= xend ){
          x = x + pY;
        }
        else {
          x = x - pY;
        }   
      }
      else if ( pY = 1 ) {
        y = y + 1 ;
        if ( x <= xend ){
          x = x + 1;
        }
        else {
          x = x - 1;
        }   
      }
      else {
        y = y + (1/pY);
        if ( x <= xend ){
          x = x + 1;
        }
        else {
          x = x - 1;
        }  
      }
      console.log(Math.round( x ) + "   " + Math.round( y ));
      drawpix( Math.round( x ), Math.round( y ) );
    }
  }
}

function drawMidPointCircule(X1, Y1, R) {
  console.log( X1 + "   " + Y1 + "    " + R );
  if( X1 > Y1 ){
    X1 = X1 - ( X1 - Y1 );
  }
  else {
    Y1 = Y1 - ( Y1 - X1 );
  }
  console.log( X1 + "   " + Y1 + "    " + R );

  X0 = 0;
  Y0 = 10;
  P0 = 1 - 10;

  x = X0;
  y = Y0;
  console.log(x + " " + y);

  while( y >= x ) {

    drawpixCircul( x + X1, y + Y1);
    drawpixCircul( y + Y1, x + X1);
    drawpixCircul( x + X1,-y + Y1);
    drawpixCircul(-y + Y1, x + X1);
    drawpixCircul(-x + X1, y + Y1);
    drawpixCircul( y + Y1,-x + X1);
    drawpixCircul(-x + X1,-y + Y1);
    drawpixCircul(-y + Y1,-x + X1);
    x++;
    if( P0  < 0 ) {
      P0 += 2*x + 1;
    }
    else {
      y--;
      P0 += 2*((x + 1) - y);
    }

  }

}

function drawpix(x,y){

  if(draw){
    Figures[Figures.length - 1].Layer[x][y] = true;
    console.log(Figures[Figures.length - 1].Layer[x][y]);
    rContext.beginPath();
    rContext.moveTo(x,y);
    rContext.lineTo(x+1,y+1);
    rContext.closePath();
    rContext.stroke();
  }
  else {
    rContextpreview.beginPath();
    rContextpreview.moveTo(x,y);
    rContextpreview.lineTo(x+1,y+1);
    rContextpreview.closePath();
    rContextpreview.stroke();
  }
}

function drawpixCircul(x,y) {
  console.log(x,y);
  rContext.fillRect(x,y,1,1);

}

function selectPixel(x, y){
  rContext.beginPath();
  rContext.strokeStyle = "rgba("+ Figures[0].color +")";
  rContext.moveTo(x,y);
  rContext.lineTo(x+1,y+1);
  rContext.closePath();
  rContext.stroke();
}