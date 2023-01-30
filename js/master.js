var canvas = document.getElementById("canvas");
var click = true;
var X1, X2, Y1, Y2;

canvas.addEventListener( "click", function(event){

  let x = event.offsetX;
  let y = event.offsetY;

  if ( click ) {
    X1 = x;
    Y1 = y;
    click = false;
  }
  else {
    X2 = x;
    Y2 = y;
    drawDDA();
    click = true;
  }

  console.log( x + "   " + y );
  drawpix( x, y );

});

function drawBresenham() {
      console.log(X1 + "   " + Y1 + "  - " + X2 + "   " + Y2);
      // DELTAS DE LA LINEA 
      dY = Math.abs( Y2 - Y1 );
      dX = Math.abs( X2 - X1 );
      // PUNTO DE DECICION
      pX = 2 * dY - dX;
      pY = 2 * dX - dY;
      console.log( dY + "  " +  dX );
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
        console.log( x + "   " + y + "   " + dX);
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
          console.log( x + "   " + y  + "   " + pX);
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
        console.log( x + "   " + y );
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
          console.log( x + "   " + y );
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

function drawpix(x,y){
  var rContext = canvas.getContext("2d");
  rContext.beginPath();
  rContext.moveTo(x,y);
  rContext.lineTo(x+1,y+1);
  rContext.closePath();
  rContext.stroke();
}