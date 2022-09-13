function frameRendering() {
  //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  Vctx.drawImage(videoO, 0, 0, pW * 2, pH * 2, 0, 0, pW, pH); //Quad-pixel
  dataO = Vctx.getImageData(0, 0, pW, pH).data;
}

//Every image array goes like... RGBA_RGBA_RGBA... right?

function invertColor() {
  console.time("invertColor");
  dataI = dataO.slice();  //The data we will manipulate
  let iDisplay = Ictx.createImageData(pW, pH);
  iData = iDisplay.data; //The array that will revive the data
      
  for (let i = 0; i < dataI.length; i++) {
    if(i%4 == 3){
      iData[i] = dataI[i];
    }else{
      iData[i] = 255 - dataI[i];
    }
  }
      
  Ictx.putImageData(iDisplay, 0, 0);
  console.timeEnd("invertColor");
  setTimeout(invertColor, 3.33);
}

function hslColor(){
  console.time("hslColor");
  dataHSL = dataO.slice();  //The data we will manipulate
  let hslDisplay = HSLctx.createImageData(pW, pH);
  hslData = hslDisplay.data; //The array that will revive the data

  let HSLchanelS = document.getElementById('HSLselector').value;

  for(let i=1; i<=dataHSL.length / 4; i++){

    let hslR = RGBToHSL(dataHSL[i*4-4], dataHSL[i*4-3], dataHSL[i*4-2], 'b');
    dataHSL[i*4-4] = (HSLchanelS=='H')? hslR[0] : 0; //Hue
    dataHSL[i*4-3] = (HSLchanelS=='S')? hslR[1] : 0; //Saturation
    dataHSL[i*4-2] = (HSLchanelS=='L')? hslR[2] : 0; //Luminosity

    hslData[i*4-4] = dataHSL[i*4-4];
    hslData[i*4-3] = dataHSL[i*4-3];
    hslData[i*4-2] = dataHSL[i*4-2];
    hslData[i*4-1] = dataHSL[i*4-1];
  }
  

  HSLctx.putImageData(hslDisplay, 0, 0);
  console.timeEnd("hslColor");
  setTimeout(hslColor, 3.33);


  /*Se convertirá a RGB, Y luego... pues ya, resaltar ese color con cierto grado de diferencia, "margen de error.

  */
}

function RGBToHSL(r,g,b,t) { //t stands for type
  /*Thanks "Elie G." for sharing your answer on StackOverFlow...
  https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion */
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    

  ////////////////
  if(t=='n'){
    //The normal % way
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }else if(t=='b'){
    //b, byte, 256 format
    h = h / 45 * 32;
    s = Math.floor(s * 256); //The problem might rely here...
    l = Math.floor(l * 256);
    return [h, s, l];
  }else{
    return [255, 255, 255]; //(More notorious the white than the black)
  }
}
