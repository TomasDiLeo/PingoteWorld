function calcularPrecio() {
    var entradaPrecio = 100;
    var cantidad = parseInt(document.getElementById("cantidad").value);
    
    if (cantidad && cantidad >= 1) {
        var precioTotal = entradaPrecio * cantidad;
        document.getElementById("precioTotal").textContent = "El precio total es: " + precioTotal + " unidades monetarias.";
    } else {
        document.getElementById("precioTotal").textContent = "La cantidad ingresada es inválida.";
    }
}
