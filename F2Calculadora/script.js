let ke = 9 * 10 ** 9;
let e0 = 8.9 * 10 ** -12;

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

  var Xcarga1 = parseFloat(document.getElementById("Xcarga1").value);
  var Ycarga1 = parseFloat(document.getElementById("Ycarga1").value);
  var Xcarga2 = parseFloat(document.getElementById("Xcarga2").value);
  var Ycarga2 = parseFloat(document.getElementById("Ycarga2").value);

  var punto1 = new Vector(Xcarga1, Ycarga1);
  var punto2 = new Vector(Xcarga2, Ycarga2);

  var direccionFuerza = Vector.sub(punto2, punto1);
  var distancia = Vector.len(direccionFuerza);

  if (Vector.len(direccionFuerza) != 0) {
    direccionFuerza = Vector.normalize(direccionFuerza);
  }

  var modulo = (ke * carga1 * carga2) / distancia ** 2;

  document.getElementById("modulo").value = modulo.toExponential(2);
  document.getElementById("direccion").value =
    "(" +
    direccionFuerza.x.toFixed(2) +
    ", " +
    direccionFuerza.y.toFixed(2) +
    ")";
}

function calcularCampo() {
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
  
    var XCargaCampo= parseFloat(document.getElementById("XCargaCampo").value);
    var YCargaCampo = parseFloat(document.getElementById("YCargaCampo").value);
    var XCampo = parseFloat(document.getElementById("XCampo").value);
    var YCampo = parseFloat(document.getElementById("YCampo").value);
  
    var punto1 = new Vector(XCargaCampo, YCargaCampo);
    var punto2 = new Vector(XCampo, YCampo);
  
    var direccionCampo = Vector.sub(punto2, punto1);
    var distancia = Vector.len(direccionCampo);
  
    if (Vector.len(direccionCampo) != 0) {
        direccionCampo = Vector.normalize(direccionCampo);
    }

    var modulo = (ke * carga) / distancia ** 2;
  
    document.getElementById("moduloCampo").value = modulo.toExponential(2);
    document.getElementById("direccionCampo").value =
      "(" +
      direccionCampo.x.toFixed(2) +
      ", " +
      direccionCampo.y.toFixed(2) +
      ")";
  }
