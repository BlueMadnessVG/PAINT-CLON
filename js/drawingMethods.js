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

function drawMidPoint(X1, X2, Y1, Y2) {
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
        drawpixBtn( x, y );
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
          drawpixBtn( x, y );
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
        drawpixBtn( x, y );
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
          drawpixBtn( x, y );
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
  X0 = 0;
  Y0 = R;
  P0 = (5/4) - R;

  x = X0;
  y = Y0;
  console.log(x + " " + y);

  while( y >= x ) {

    drawpix( X1 + x , Y1 + y );
    drawpix( X1 - x , Y1 + y );
    drawpix( X1 + x , Y1 - y );
    drawpix( X1 - x , Y1 - y );

    drawpix( X1 + y , Y1 + x );
    drawpix( X1 - y , Y1 + x );
    drawpix( X1 + y , Y1 - x );
    drawpix( X1 - y , Y1 - x );
    x++;
    if( P0  < 0 ) {
      P0 += (2*x) + 1;
    }
    else {
      y--;
      P0 += (2*(x - y)) + 1;
    }

  }

}

function drawBresenhamCircule(X1, Y1, R) {
  console.log( X1 + "   " + Y1 + "    " + R );
  X0 = 0;
  Y0 = R;
  P0 = (3-2) * R;

  x = X0;
  y = Y0;
  console.log(x + " " + y);

  while( y >= x ) {

    drawpix( X1 + x , Y1 + y );
    drawpix( X1 - x , Y1 + y );
    drawpix( X1 + x , Y1 - y );
    drawpix( X1 - x , Y1 - y );

    drawpix( X1 + y , Y1 + x );
    drawpix( X1 - y , Y1 + x );
    drawpix( X1 + y , Y1 - x );
    drawpix( X1 - y , Y1 - x );
    x++;
    if( P0  < 0 ) {
      P0 += (4*x) + 6;
    }
    else {
      y--;
      P0 += (4*(x - y)) + 10;
    }

  }

}

function drawTrigonometricCircle( X1, Y1, R ) {

  t = (Math.PI * 90) / 180;

  for( i = 0; i < t; i += 0.008 ){

    x = Math.cos(i) * R;
    y = Math.sin(i) * R;

    drawpix( X1 + x , Y1 + y );
    drawpix( X1 - x , Y1 + y );
    drawpix( X1 + x , Y1 - y );
    drawpix( X1 - x , Y1 - y );

    drawpix( X1 + y , Y1 + x );
    drawpix( X1 - y , Y1 + x );
    drawpix( X1 + y , Y1 - x );
    drawpix( X1 - y , Y1 - x );

  }

}

function drawElipse( X1, Y1, a, b ) {

  t = (Math.PI * 90) / 180;

  for( i = 0; i < t; i += 0.008 ){

    x = Math.cos(i) * a;
    y = Math.sin(i) * b;

    drawpix( X1 + x , Y1 + y );
    drawpix( X1 - x , Y1 + y );
    drawpix( X1 + x , Y1 - y );
    drawpix( X1 - x , Y1 - y );

  }

}

function drawTrigonometric(X1, Y1, R) {

  angle = (Math.PI * 2) / 5;

  ax = R * Math.cos(1 * angle);
  ay = R * Math.sin(1 * angle);
  for( p = 0; p <= 5; p++ ){

    tx = R * Math.cos(p * angle);
    ty = R * Math.sin(p * angle);

    drawpix( X1 + tx , Y1 + ty );
    drawBresenham( X1 + ax, X1 + tx , Y1 + ay, Y1 + ty);

    ax = tx;
    ay = ty;

  }

}