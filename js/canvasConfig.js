function redrawCanvas() {

    for(i = 0; i < Figures.length; i++) {
      if( !move || !resize ){
        console.log(Figures[i]);  
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

  function configCanvas() {

    type = document.getElementsByClassName("activeC")[0].id;
  
    switch(type){
  
      case 'move':
        for(i = 0; i < Figures.length; i++) {
          if( Figures[i].Layer[X1][Y1] ){
  
            move = true;
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
            rContextpreview.clearRect(0, 0, canvas.width, canvas.height);
            redrawCanvas();
  
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

  function redrawPixel( x, y, L ){
    rContext.fillStyle = Figures[L].borderColor;
    rContext.fillRect(x, y, Figures[L].border, Figures[L].border);
  }
    