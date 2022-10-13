import { URL_ENDPOINT_RESERVATION } from './reservationFunctions.js';


// ajax para recolectar la informacion del reporte de estado de reservaciones
// completas vs canceladas
function traerReporteStatus() {
    $.ajax({
        url: `${URL_ENDPOINT_RESERVATION}/report-status`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            drawStatusReport(response);
        }
    });
}

// Dibuja el reporte de estado de reservaciones a partir de la respuesta ajax
function drawStatusReport(json_reservation_status) {
    let myTable = "<table class = 'table-auto min-w-full bg-blue-400'>";
    myTable += "<thead class = 'bg-blue-300 border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' colspan='2' class='text-sm font-medium text-gray-900 px-6 py-4 text-center bg-blue-100'>Reporte de estado de reservaciones</th>";
    myTable += "</tr>    ";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>completadas</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>canceladas</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    myTable += "<tr>";
    myTable += `<td class='border-black text-center'> ${json_reservation_status.completed}</td>`;
    myTable += `<td class='border-black text-center'> ${json_reservation_status.cancelled}</td>`;
    myTable += "</tr>";

    myTable += "</table>";
    $("#resultado1").html(myTable);
}

// ajax para recolectar la informacion del reporte de clientes de reservaciones
// total + informacion de cliente
function traerReportesClientes() {
    $.ajax({
        url: `${URL_ENDPOINT_RESERVATION}/report-clients`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            drawClientReport(response);
        }
    });
}

// Dibuja el reporte de cliente de reservaciones a partir de la respuesta ajax
function drawClientReport(json_reservation_clients) {
    let myTable = "<table class = 'table-auto min-w-full bg-blue-400'>";
    myTable += "<thead class = 'bg-blue-300 border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' colspan='4' class='text-sm font-medium text-gray-900 px-6 py-4 text-center bg-blue-100'>Reporte de clientes</th>";
    myTable += "</tr>    ";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>id</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>numero total de reservaciones</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>nombre</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>email</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0, limit = json_reservation_clients.length; i < limit; i++) {
        myTable += "<tr>";
        myTable += `<td class='border-black text-center'> ${json_reservation_clients[i].client.id}</td>`;
        myTable += `<td class='border-black text-center'> ${json_reservation_clients[i].total}</td>`;
        myTable += `<td class='border-black text-center'> ${json_reservation_clients[i].client.name}</td>`;
        myTable += `<td class='border-black text-center'> ${json_reservation_clients[i].client.email}</td>`;
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultado1").html(myTable);
}

function traerReportesFechas() {
    $.ajax({
        url: `${URL_ENDPOINT_RESERVATION}/report-dates/{dateOne}/{dateTwo}`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            //pintarCategoria(response);
        }
    });
}


function loadClickEventHandlers() {
    $("#report-status").on('click', traerReporteStatus);
    $("#report-clients").on('click', traerReportesClientes);
}

// Asegura que la pagina este completamente cargada antes de aniadir eventos a los botones
$(function () {
    loadClickEventHandlers();
});