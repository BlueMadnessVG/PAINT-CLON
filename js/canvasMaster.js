var canvas = document.getElementById("canvas");
const rContext = canvas.getContext("2d");
var canvaspreview = document.getElementById("canvas-preview");
const rContextpreview = canvaspreview.getContext("2d");

const buttons = document.querySelectorAll(".shapes");
const configButtons = document.querySelectorAll(".config");
const menuButtons = document.querySelectorAll(".menu-btn");

var slider = document.getElementById("myRange");
var output = document.getElementById("border");
var menu = document.getElementById("menu");

var clear = document.getElementById("clear");
var save = document.getElementById("save-modal");
var modal = document.getElementsByClassName("save-menu")[0];
var span = document.getElementsByClassName("close")[0];

var savePNG = document.getElementsByClassName("save-img")[0];
var saveCanvas = document.getElementById("save");
var restoreCanvas = document.getElementById("restore");
var inputFile = document.getElementById("selecFile");

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
var f_rotate = false;
var index;
var X1, X2, Y1, Y2, aux1, aux2;
var x_medio, y_medio;
var pointsMatrix;

save.onclick = function() {

  modal.style.display = "block";

}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

savePNG.onclick = function( event ) {

  canvas.style.backgroundColor = "white";
  var dataURL = canvas.toDataURL();

  var link = document.createElement("a");
  link.href = dataURL;
  link.download = "myImage.png";

  link.click();
  link.remove();

  modal.style.display = "none";

}

saveCanvas.onclick = function( event ) {

  var text = "";
  Figures.forEach( function( Figure ) {
    text +=  Figure.type + "/" + "" + Figure.sp1[0] + "/" + Figure.sp1[1] + "/" + Figure.sp2[0] + "/" + Figure.sp2[1] + "/" + Figure.a + "/" + Figure.b + "/" +
             Figure.n + "/" + Figure.border + "/" + Figure.backgroundColor + "/" + Figure.borderColor + "\n";
  } );

  console.log("Text to save:", text);

  var blob = new Blob( [text], {type: "text/plain;charset=utf-8"} );
  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.href = url;
  link.download = "myVector.paint";

  document.body.appendChild(link);
  link.click();

}

restoreCanvas.onclick = function( event ) {
  rContext.clearRect(0, 0, canvas.width, canvas.height);
  inputFile.click();
}

function parseCsv(csvString) {
  var parsedData = Papa.parse(csvString, {
    header: true,
    dynamicTyping: true
  });
  return parsedData.data;
}

inputFile.addEventListener( "change", function( event ) {

  Figures.splice(0, Figures.length);

  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function() {
    var data = reader.result;

    data.split("\n").forEach( function( line ) {

      var parts = line.split("/");

      if( parts[0] != "" ) {
        var dataRestored = new struct( parts[0], [parseInt(parts[1]) , parseInt(parts[2]) ], [parseInt(parts[3]) , parseInt(parts[4]) ], parseInt(parts[5]), parseInt(parts[6]), parts[7], parts[8], parts[9], parts[10], new Array(canvas.width).fill(0).map( () => new Array(canvas.height).fill(0) ) );
        Figures.push( dataRestored );

        index =  Figures.length - 1;
        X1 = Figures[index].sp1[0]; X2 = Figures[index].sp2[0]; 
        Y1 = Figures[index].sp1[1]; Y2 = Figures[index].sp2[1];

        if( Figures[index].type == "shapes" || Figures[index].type == "ellipse" ){
          a = Figures[index].a;
          b = Figures[index].b;
        }

        rContext.fillStyle = Figures[index].borderColor;
        drawFigure( Figures[index].type );
        redrawBG( Figures[index].type );
        X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0; index = undefined;
      }

    } );
    
  };

  reader.readAsText(file);
  console.log(Figures);
  span.click();

} );



clear.addEventListener( "click", function( event ){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      Figures.splice(0, Figures.length);
      rContext.clearRect(0, 0, canvas.width, canvas.height);
    
      console.log( Figures );

      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

} );

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
  if ( !resize && !rotate ){
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

    if( (document.getElementsByClassName("activeC")[0] != undefined) && ( !move && !resize && !rotate ) ){
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
      var prueba = new struct( type, [X1,Y1], [X2,Y2], a, b, S, slider.value, "", borderColor.value, new Array(canvas.width).fill(0).map( () => new Array(canvas.height).fill(0) ) );
      Figures.push( prueba );
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
    Figures[index].sp2[0] = X2;
    Figures[index].sp2[1] = Y2;
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

    Figures[index].Layer = new Array(canvas.width).fill(0).map( () => new Array(canvas.height).fill(0) );

    if( Figures[index].type == "line" ){

      newp = pixelRotation( X1, Y1 );
      Figures[index].sp1 = newp;
      newp = pixelRotation( X2, Y2 );
      Figures[index].sp2 = newp;

      X1 = Figures[index].sp1[0]; X2 = Figures[index].sp2[0]; Y1 = Figures[index].sp1[1]; Y2 = Figures[index].sp2[1];

    }
    else {
      f_rotate = true;
    }

    rotate = false;
    drawFigure( Figures[index].type );
    redrawBG();
    f_rotate = false;

    X1 = undefined; X2 = undefined; Y1 = undefined; Y2 = undefined; R = 0; a = 0; b = 0; index = undefined;

    rContext.clearRect(0, 0, canvas.width, canvas.height);
    rContextpreview.clearRect(0, 0, canvas.width, canvas.height);
    redrawCanvas();

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

    var sin = Math.sin( theta );
    var cos = Math.cos( theta );

    var trab = [ [ 1 , 0 , x_medio ],
                 [ 0 , 1 , y_medio ], 
                 [ 0 , 0 ,  1  ] ]; 

    var nrm = [ [ cos, -sin, 0 ],
                [ sin,  cos, 0 ],
                [  0 ,   0 , 1 ] ];

    var tra = [ [ 1 , 0 , -( x_medio ) ],
                [ 0 , 1 , -( y_medio ) ], 
                [ 0 , 0 ,  1  ] ];           

    pointsMatrix = multiplyMatrices( trab, nrm );
    pointsMatrix = multiplyMatrices( pointsMatrix, tra );
 
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

// Define a function to multiply two matrices
function multiplyMatrices(matrix1, matrix2) {
  const result = [];

  // Iterate over the rows of the first matrix
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];

    // Iterate over the columns of the second matrix
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;

      // Iterate over the columns of the first matrix and the rows of the second matrix
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }

      result[i][j] = sum;
    }
  }

  return result;
}

function savePixel(x, y, figure, S){

  if( S == 1 ){
    if( ( x >= 0 && x < canvas.width ) && ( y >= 0 && y < canvas.height ) )
      figure.Layer[x][y] = 1;
  }
  else{
    for( NX = 0; NX < S; NX++ ){
      for( NY = 0; NY < S; NY++ ){
            if( ( x + NX >= 0 && x + NX < canvas.width ) && ( y + NY >= 0 && y < canvas.height ) ){
              figure.Layer[x + NX][y + NY] = 1;
            }
      }
    }
  }

}

function pixelRotation( x, y ){

  if( rotate || f_rotate ){

    var inp = [ x, y, 1 ];
    inp = matrixVectorMultiply( pointsMatrix, inp );
    
    return [ inp[0], inp[1] ];
  }
  else {
    return [ x, y ];
  }

}

function drawpix(x,y){
    x = Math.round(x);
    y = Math.round(y);

    if( index != undefined && (!move && !resize && !rotate ) ){
      newp = pixelRotation( x, y );
      savePixel(Math.floor(newp[0]),Math.floor(newp[1]), Figures[index], Figures[index].border);
      if( ( x >= 0 && x < canvas.width ) && ( y >= 0 && y < canvas.height ) )
        rContext.fillRect(newp[0],newp[1],Figures[index].border,Figures[index].border);
    }else if( draw && index == undefined ){
      newp = pixelRotation( x, y );
      savePixel(newp[0],newp[1], Figures[Figures.length - 1], Figures[Figures.length - 1].border);
      if( ( x >= 0 && x < canvas.width ) && ( y >= 0 && y < canvas.height ) )
        rContext.fillRect(newp[0],newp[1],Figures[Figures.length - 1].border,Figures[Figures.length - 1].border);
    }
    else {
      newp = pixelRotation( x, y );
      if( ( x >= 0 && x < canvas.width ) && ( y >= 0 && y < canvas.height ) )
        rContextpreview.fillRect(newp[0],newp[1],slider.value,slider.value);
    }
}
  
function selectPixel(x, y){
    rContext.fillStyle = "rgba(63,81,181, 255)";
    rContext.fillRect(x,y, 1, 1);
}