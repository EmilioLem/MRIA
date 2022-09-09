function frameRendering() {
  //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  Vctx.drawImage(videoO, 0, 0, pW * 2, pH * 2, 0, 0, pW, pH); //Quad-pixel
  dataO = Vctx.getImageData(0, 0, pW, pH).data;
}

function invertColor() {
  console.time("invertColor");
  dataI = dataO.slice();
  let iDisplay = Ictx.createImageData(pW, pH);
  iData = iDisplay.data; //Tengo que recorrer el array.
      
  for (let i = 0; i < dataI.length; i++) {
    //iData[i] = i % 4 == 0? 0 : 255 - dataI[i];
    if(i%4 == 3){
      iData[i] = dataI[i];
    }else{
      iData[i] = 255 - dataI[i];
    }
  }
      
  Ictx.putImageData(iDisplay, 0, 0);
  console.timeEnd("invertColor");
  setTimeout(invertColor, 33.33);
}

function hslColor(){
  console.time("hslColor");
  dataHSL = dataO.slice();
  let hslDisplay = HSLctx.createImageData(pW, pH);
  hslData = hslDisplay.data; //Tengo que recorrer el array.

  for (let i = 0; i < dataHSL.length; i++) {
    //hslData[i] = i % 4 == 0? 0 : 255 - dataHSL[i];
    if (i % 4 == 3) {
      hslData[i] = dataHSL[i];
    } else {
      hslData[i] = 255 - dataHSL[i];
    }
  }

  HSLctx.putImageData(hslDisplay, 0, 0);
  console.timeEnd("hslColor");
  setTimeout(hslColor, 33.33);


  /*Se convertirá a RGB: https://javascript.plainenglish.io/convert-hex-to-rgb-with-javascript-4984d16219c3 Y luego... pues ya, resaltar ese color con cierto grado de diferencia, "margen de error.

  Proceso inverso, RGB a HEX -> https://qawithexperts.com/article/javascript/rgb-to-hex-and-hex-to-rgb-using-javascript/405#:~:text=Hex%20to%20RGB%20using%20Javascript%20We%20can%20convert,will%20perform%20these%20operations%20for%20Green%20and%20Blue." 
  */
}