let ke = 9 * 10 ** 9;
let e0 = 8.9 * 10 ** -12;

function calcularHilo(){
  var lam = document.getElementById("cargaHilo").value;
  var x = document.getElementById("distanciaHilo").value;
  var mult = document.getElementById("cargaHiloMult").value;

  switch (mult) {
    case 1:
      lam = lam * 10 ** -3;
      break;
    case 2:
      lam = lam * 10 ** -6;
      break;
    case 3:
      lam = lam * 10 ** -9;
      break;
    default:
      lam = lam;
      break;
  }

  if(x == 0){
    document.getElementById("alertaHilo").style.visibility = "visible";
  }else{
    document.getElementById("alertaHilo").style.visibility = "hidden";
    var modulo = (2*ke*lam)/(x);

    document.getElementById("moduloHilo").value = modulo.toExponential(2);
  }

}

function calcularDisco(){
  var a = document.getElementById("radioDisco").value;
  var x = document.getElementById("distanciaDisco").value;
  var sig = document.getElementById("cargaDisco").value;
  var mult = document.getElementById("cargaDiscoMult").selectedIndex;

  switch (mult) {
    case 1:
      sig = sig * 10 ** -3;
      break;
    case 2:
      sig = sig * 10 ** -6;
      break;
    case 3:
      sig = sig * 10 ** -9;
      break;
    default:
      sig = sig;
      break;
  }

  if(a == 0 && x == 0){
    document.getElementById("alertaDisco").style.visibility = "visible";
  }else{
    document.getElementById("alertaDisco").style.visibility = "hidden";

    var modulo = 2 * Math.PI * ke * sig * (1 - ((x)/(((a**2)+(x**2))**(1/2))));
  
    document.getElementById("moduloDisco").value = modulo.toExponential(2);
  }


}

function calcularAnillo(){
  var a = document.getElementById("radioAnillo").value;
  var x = document.getElementById("distanciaAnillo").value;
  var Q = document.getElementById("cargaAnillo").value;
  var mult = document.getElementById("cargaAnilloMult").selectedIndex;
  

  switch (mult) {
    case 1:
      Q = Q * 10 ** -3;
      break;
    case 2:
      Q = Q * 10 ** -6;
      break;
    case 3:
      Q = Q * 10 ** -9;
      break;
    default:
      Q = Q;
      break;
  }

  if(a == 0 && x == 0){
    document.getElementById("alertaAnillo").style.visibility = "visible";
  }else{
    document.getElementById("alertaAnillo").style.visibility = "hidden";

    var modulo = (ke * Q * x)/(((a**2) + (x**2))**(3/2));
  
    document.getElementById("moduloAnillo").value = modulo.toExponential(2);
  }

}

function intercambiarFuerza() {
  var carga1 = document.getElementById("carga1");
  var mult1 = document.getElementById("carga1mult");
  var Xcarga1 = document.getElementById("Xcarga1");
  var Ycarga1 = document.getElementById("Ycarga1");

  var carga2 = document.getElementById("carga2");
  var mult2 = document.getElementById("carga2mult");
  var Xcarga2 = document.getElementById("Xcarga2");
  var Ycarga2 = document.getElementById("Ycarga2");

  var cargaAUX = carga1.value;
  var multAUX = mult1.selectedIndex;
  var XpuntoAUX = Xcarga1.value;
  var YpuntoAUX = Ycarga1.value;

  carga1.value = carga2.value;
  mult1.selectedIndex = mult2.selectedIndex;
  Xcarga1.value = Xcarga2.value;
  Ycarga1.value = Ycarga2.value;

  carga2.value = cargaAUX;
  mult2.selectedIndex = multAUX;
  Xcarga2.value = XpuntoAUX;
  Ycarga2.value = YpuntoAUX;
}

function calcularFuerza() {
  var Xcarga1 = parseFloat(document.getElementById("Xcarga1").value);
  var Ycarga1 = parseFloat(document.getElementById("Ycarga1").value);
  var Xcarga2 = parseFloat(document.getElementById("Xcarga2").value);
  var Ycarga2 = parseFloat(document.getElementById("Ycarga2").value);

  if (Xcarga1 == Xcarga2 && Ycarga1 == Ycarga2) {
    document.getElementById("alertaPunto").style.visibility = "visible";
  } else {
    document.getElementById("alertaPunto").style.visibility = "hidden";
  }

  var carga1 = document.getElementById("carga1").value;
  var mult1 = document.getElementById("carga1mult").selectedIndex;

  switch (mult1) {
    case 1:
      carga1 = carga1 * 10 ** -3;
      break;
    case 2:
      carga1 = carga1 * 10 ** -6;
      break;
    case 3:
      carga1 = carga1 * 10 ** -9;
      break;
    default:
      carga1 = carga1;
      break;
  }

  var carga2 = document.getElementById("carga2").value;
  var mult2 = document.getElementById("carga2mult").selectedIndex;

  switch (mult2) {
    case 1:
      carga2 = carga2 * 10 ** -3;
      break;
    case 2:
      carga2 = carga2 * 10 ** -6;
      break;
    case 3:
      carga2 = carga2 * 10 ** -9;
      break;
    default:
      carga2 = carga2;
      break;
  }

  var punto1 = new Vector(Xcarga1, Ycarga1);
  var punto2 = new Vector(Xcarga2, Ycarga2);

  var direccionFuerza = Vector.sub(punto2, punto1);
  var distancia = Vector.len(direccionFuerza);

  if (Vector.len(direccionFuerza) != 0) {
    direccionFuerza = Vector.normalize(direccionFuerza);
  }

  if(distancia != 0){
    var modulo = (ke * carga1 * carga2) / distancia ** 2;
  
    document.getElementById("modulo").value = modulo.toExponential(2);
    document.getElementById("direccion").value =
      "(" +
      direccionFuerza.x.toFixed(2) +
      ", " +
      direccionFuerza.y.toFixed(2) +
      ")";
  }

}

function calcularCampo() {
  var XCargaCampo = parseFloat(document.getElementById("XCargaCampo").value);
  var YCargaCampo = parseFloat(document.getElementById("YCargaCampo").value);
  var XCampo = parseFloat(document.getElementById("XCampo").value);
  var YCampo = parseFloat(document.getElementById("YCampo").value);

  if (XCargaCampo == XCampo && YCargaCampo == YCampo) {
    document.getElementById("alertaCampo").style.visibility = "visible";
  } else {
    document.getElementById("alertaCampo").style.visibility = "hidden";
  }

  var carga = document.getElementById("cargaCampo").value;
  var mult = document.getElementById("cargaCampoMult").selectedIndex;

  switch (mult) {
    case 1:
      carga = carga * 10 ** -3;
      break;
    case 2:
      carga = carga * 10 ** -6;
      break;
    case 3:
      carga = carga * 10 ** -9;
      break;
    default:
      carga = carga;
      break;
  }

  var punto1 = new Vector(XCargaCampo, YCargaCampo);
  var punto2 = new Vector(XCampo, YCampo);

  var direccionCampo = Vector.sub(punto2, punto1);
  var distancia = Vector.len(direccionCampo);

  if (Vector.len(direccionCampo) != 0) {
    direccionCampo = Vector.normalize(direccionCampo);
  }

  if(distancia != 0){
    var modulo = (ke * carga) / distancia ** 2;
  
    document.getElementById("moduloCampo").value = modulo.toExponential(2);
    document.getElementById("direccionCampo").value =
      "(" +
      direccionCampo.x.toFixed(2) +
      ", " +
      direccionCampo.y.toFixed(2) +
      ")";
  }
}
