function redrawCanvas() {

    for(i = 0; i < Figures.length; i++) {
      if( index == undefined ){
        for( y = 0; y < canvas.height; y++ ){
          for( x = 0; x < canvas.width; x++ ){
            if ( Figures[i].Layer[x][y] == 1 ){
              redrawPixel(x, y, i);
            }
            else if( Figures[i].Layer[x][y] == 2 ) {
              redrawPixelBG(x, y, i);
            }
          }
        }
      }
      else if( index != i ){
        for( y = 0; y < canvas.height; y++ ){
          for( x = 0; x < canvas.width; x++ ){
            if ( Figures[i].Layer[x][y] == 1 ){
              redrawPixel(x, y, i);
            }
            else if( Figures[i].Layer[x][y] == 2 ){
              redrawPixelBG(x, y, i);
            }
          }
        }
  
      }
    }
  
  }
  
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

  function menuDisplayNone() {
  
    menu.style.display = "none";
    if( !move && !resize && !rotate )
      index = undefined;

  }
  
  function moveFigure(Newindex) {
  
    const element = Figures.splice(index, 1)[0];
    Figures.splice(Newindex, 0, element);
  
  }
  
  menuButtons.forEach(btn => {
    btn.addEventListener("click", function(event) {
      switch (btn.id) {
        case 'moveUp':
          if( index != Figures.length - 1 ){
            moveFigure(index + 1);
          }
          index = undefined;
          redrawCanvas();
          menuDisplayNone();
  
          break;
        case 'moveDown':
  
          if( index != 0 ){
            moveFigure(index - 1);
          }
          index = undefined;
          redrawCanvas();
          menuDisplayNone();
  
          break;
        case 'resize':
          
          resize = true;
          console.log(index);
          X1 = Figures[index].sp1[0]; X2 = Figures[index].sp2[0]; Y1 = Figures[index].sp1[1]; Y2 = Figures[index].sp2[1];
          a = Figures[index].a; b = Figures[index].b;

          rContext.clearRect(0, 0, canvas.width, canvas.height);
          redrawCanvas();
          menuDisplayNone();
          break;
        case 'rotate':

          console.log(Figures[index]);
          rotate = true;
          X1 = Figures[index].sp1[0]; X2 = Figures[index].sp2[0]; Y1 = Figures[index].sp1[1]; Y2 = Figures[index].sp2[1];

          if( Figures[index].type == "line" ){
            x_medio = (X1 + X2) / 2;
            y_medio = (Y1 + Y2) / 2;  
          } else {
            x_medio = X1;
            y_medio = Y1;

            a = Figures[index].a; b = Figures[index].b;
          }

          rContext.clearRect(0, 0, canvas.width, canvas.height);
          redrawCanvas();
          menuDisplayNone();
          
          break;
        case 'clear':
  
          Figures.splice(index, 1);
  
          rContext.clearRect(0, 0, canvas.width, canvas.height);
  
          index = undefined;
          redrawCanvas();
          menuDisplayNone();
  
          break;
      }
  
    });
  })

  function configCanvas() {

    type = document.getElementsByClassName("activeC")[0].id;
  
    switch(type){
  
      case 'move':
        for(i = 0; i < Figures.length; i++) {
          if( Figures[i].Layer[X1][Y1] == 1 || Figures[i].Layer[X1][Y1] == 2 ){
  
            move = true;
            

            X1 = Figures[i].sp1[0]; X2 = Figures[i].sp2[0]; Y1 = Figures[i].sp1[1]; Y2 = Figures[i].sp2[1];
            aux1 = X1;
            aux2 = Y1;
  
            if( Figures[i].type == "shapes" || Figures[i].type == "ellipse" ){
              a = Figures[i].a;
              b = Figures[i].b;
            }
  
            index = i;
            i = Figures.length;
  
            rContext.clearRect(0, 0, canvas.width, canvas.height);
            rContextpreview.clearRect(0, 0, canvas.width, canvas.height);
            redrawCanvas();
  
          }
        }
      break;
    case 'bucket':

      for(i = 0; i < Figures.length; i++) {
        if( Figures[i].Layer[X1][Y1] == 1 || Figures[i].Layer[X1][Y1] == 2 ){
          index = i;
          drawBG();
          i = Figures.length;
        }
      }

      break;
  
    case 'color':
      for(i = 0; i < Figures.length; i++) {
        if( Figures[i].Layer[X1][Y1] == 1 ){
          if( Figures[i].borderColor != borderColor.value ){
            Figures[i].borderColor = borderColor.value;
          }
          redrawCanvas();
        }
      }
      break;
  
    }
  
  }

  function drawBG() {

    if( Figures[index].type != 'line' ){
      if( (Figures[index].backgroundColor == "#ffff") ){
        Figures[index].backgroundColor = backgroundColor.value;
        rContext.fillStyle = Figures[index].backgroundColor;    

        floodFillRecL( Figures[index].sp1[0], Figures[index].sp1[1] );
        floodFillRecR( Figures[index].sp1[0] + 1, Figures[index].sp1[1] );  
      }
      else{
        Figures[index].backgroundColor = backgroundColor.value;
        rContext.fillStyle = Figures[index].backgroundColor;
        index = undefined;
        redrawCanvas();  
      }
    }
    else {
      Figures[index].borderColor = backgroundColor.value;
      redrawCanvas();
    }
  }

  function redrawBG() {

    if( Figures[index].type != 'line' && Figures[index].backgroundColor != "#ffff" ){
      rContext.fillStyle = Figures[index].backgroundColor;    

      floodFillRecL( Figures[index].sp1[0], Figures[index].sp1[1] );
      floodFillRecR( Figures[index].sp1[0] + 1, Figures[index].sp1[1] );
    }

  }

  function floodFillRecL(x, y){

    if( (x < 0 || x > canvas.width) || (y < 0 || y > canvas.height)) return;
    if( Figures[index].Layer[x][y] == 1 || Figures[index].Layer[x][y] == 2 ) return; 

    Figures[index].Layer[x][y] = 2;
    rContext.fillRect(x, y, 1, 1);

    floodFillRecL(x - 1, y);
    floodFillRecL(x, y - 1);
    floodFillRecL(x, y + 1);

  }

  function floodFillRecR(x, y){

    if( (x < 0 || x > canvas.width) || (y < 0 || y > canvas.height)) return;
    if( Figures[index].Layer[x][y] == 1 || Figures[index].Layer[x][y] == 2 ) return; 

    Figures[index].Layer[x][y] = 2;
    rContext.fillRect(x, y, 1, 1);

    floodFillRecR(x + 1, y);
    floodFillRecR(x, y - 1);
    floodFillRecR(x, y + 1);

  }

  function redrawPixel( x, y, L ){
    rContext.fillStyle = Figures[L].borderColor;
    rContext.fillRect(x, y, Figures[L].border, Figures[L].border);
  }
  
  function redrawPixelBG( x, y, L ){
    rContext.fillStyle = Figures[L].backgroundColor;
    rContext.fillRect(x, y, Figures[L].border, Figures[L].border);
  }
    