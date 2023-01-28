function draw() {
    
    const X1 = 70, X2 = 100, Y1 = 50, Y2 = 75;
    
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
  
      ctx.beginPath();

      dY = ( Y2 - Y1 );
      dX = ( X2 - X1 );
      D = ( 2 * dY ) - dX;

      dD = 2 * ( dY - dX ); 

      if( X1 > X2 ) {
        x = X2;
        y = Y2;
        xend = X1;
      }
      else {
        x = X1;
        y = Y1;
        xend = X2;
      }

      while ( x <= xend ) {

        ctx.moveTo(x, y);
        ctx.lineTo(X2, Y2);
        ctx.stroke();

      }
      
    }
}