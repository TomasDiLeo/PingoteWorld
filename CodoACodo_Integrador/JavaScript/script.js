function calcularPrecio(){
    var precioTicket = 200;
    var cantidad = parseInt(document.getElementById("varCantidad").value);
    var categoria = parseInt(document.getElementById("varCategoria").value);
    var descuento;
    switch (categoria) {
        case 1:
            descuento = 0.8;
        break;
        case 2:
            descuento = 0.5;
        break;
        case 3:
            descuento = 0.15;
        break;
        default:
            descuento = 0;
            break;
    }

    var precioFinal = (precioTicket * cantidad) - ((precioTicket * cantidad)*descuento);
    document.getElementById("varMonto").textContent = precioFinal;
}

function borrar(){
    document.getElementById("varNombre").value = "";
    document.getElementById("varApellido").value = "";
    document.getElementById("varCorreo").value = "";
    document.getElementById("varCantidad").value = "";
    document.getElementById("varCategoria").value = 0;
    document.getElementById("varMonto").textContent = "";
}