import { URL_ENDPOINT_RESERVATION } from './reservationFunctions.js';

function traerReporteStatus() {
    $.ajax({
        url: `${URL_ENDPOINT_RESERVATION}/report-status`,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            pintarStatus(respuesta);
        }
    });
}

function pintarStatus(json_reservation_status) {
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

function traerReportesFechas() {
    $.ajax({
        url: `${URL_ENDPOINT_RESERVATION}/report-dates/{dateOne}/{dateTwo}`,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            //pintarCategoria(respuesta);
        }
    });
}

function traerReportesClientes() {

    $.ajax({
        url: `${URL_ENDPOINT_RESERVATION}/report-clients`,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            //pintarCategoria(respuesta);
        }
    });
}

function init() {
    $("#report-status").on('click', traerReporteStatus);
    $("#report-clients").on('click', traerReportesClientes);
}

$(function () {
    init();
});