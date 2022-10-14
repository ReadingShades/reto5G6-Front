import { URL_ENDPOINT_RESERVATION } from './reservationFunctions.js';


// ajax para recolectar la informacion del reporte de estado de reservaciones
// completas vs canceladas
function traerReporteStatus() {
    $.ajax({
        url: `${URL_ENDPOINT_RESERVATION}/report-status`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            //console.log(response);
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
            //console.log(response);
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
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>idClient</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>numero total de reservaciones</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>email</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>nombre</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0, limit = json_reservation_clients.length; i < limit; i++) {
        myTable += "<tr>";
        myTable += `<td class='border-black text-center'> ${json_reservation_clients[i].client.idClient}</td>`;
        myTable += `<td class='border-black text-center'> ${json_reservation_clients[i].total}</td>`;
        myTable += `<td class='border-black text-center'> ${json_reservation_clients[i].client.email}</td>`;
        myTable += `<td class='border-black text-center'> ${json_reservation_clients[i].client.name}</td>`;
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultado1").html(myTable);
}

// ajax para recolectar la informacion del reporte de reservaciones existentes entre 2 fechas
function traerReportesFechas() {
    let dateOne = $("#dateOne").val();
    let dateTwo = $("#dateTwo").val();
    //console.log(dateOne, dateTwo);
    let dateOneArray = dateOne.split('-');
    let dateTwoArray = dateTwo.split('-');
    // pruebas para verificar que la fecha 1 sea anterior a la fecha 2
    let yearTest = Number(dateOneArray[0]) <= Number(dateTwoArray[0]);
    let monthTest = Number(dateOneArray[1]) <= Number(dateTwoArray[1]);
    let dayTest = Number(dateOneArray[2]) <= Number(dateTwoArray[2]);
    // console.log(dateOneArray, dateTwoArray);
    // console.log(yearTest, monthTest, dayTest);
    // console.log(yearTest && monthTest && dayTest);
    if (yearTest && monthTest && dayTest) {
        $.ajax({
            url: `${URL_ENDPOINT_RESERVATION}/report-dates/${dateOne}/${dateTwo}`,
            type: "GET",
            datatype: "JSON",
            success: function (response) {
                console.log(response);
                drawDatesBetweenReport(dateOne, dateTwo, response);
            }
        });
    } else {
        console.log('test')
        alert("Verifique que la fecha Desde sea menor o igual a la Hasta.");
    }
}

// Crea un formulario para recolectar la informacion del periodo de estudio
// para el reporte de reservaciones entre 2 fechas
function drawDatesBetweenForm() {
    let myForm = "<section class='container flex items-center justify-center'>"
    myForm += "<Form>";
    myForm += "<div>";
    myForm += "<label name='dateOne'>Desde: </label>";
    myForm += "<input id='dateOne' name='dateOne' type='date' value='2020-01-01'>";
    myForm += "</div>";
    myForm += "<div>";
    myForm += "<label name='dateTwo'>Hasta: </label>";
    myForm += "<input id='dateTwo' name='dateTwo' type='date' value='2020-12-31'>";
    myForm += "</div>";
    myForm += "<br/>";
    myForm += "<button id='report-between-dates' type='button' class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> Reporte Fechas Reservaciónes</button>";
    myForm += "<br />";
    myForm += "</Form>";
    myForm += "</section>"
    myForm += "<section>"
    myForm += "<div id='resultado2'></div>";
    myForm += "</section>"
    $("#resultado1").html(myForm);
    $('#report-between-dates').on('click', traerReportesFechas);
}

// Dibuja el reporte de cliente de reservaciones a partir de la respuesta ajax
function drawDatesBetweenReport(dateOne, dateTwo, json_reservation_list) {
    let myTable = "<table class = 'table-auto min-w-full bg-blue-400'>";
    myTable += "<thead class = 'bg-blue-300 border-b'>";
    myTable += "<tr>";
    myTable += `<th scope='col' colspan='11' class='text-sm font-medium text-gray-900 px-6 py-4 text-center bg-blue-100'>Reporte de reservaciones entre fechas (${dateOne} /// ${dateTwo})</th>`;
    myTable += "</tr>    ";
    myTable += "<tr>";
    myTable += `<th scope='col' colspan='5' class='text-sm font-medium text-gray-900 px-6 py-4 text-center bg-blue-400'>Datos reservacion</th>`;
    myTable += `<th scope='col' colspan='3' class='text-sm font-medium px-6 py-4 text-center bg-blue-600 text-white'>Datos cliente</th>`;
    myTable += `<th scope='col' colspan='3' class='text-sm font-medium px-6 py-4 text-center bg-blue-500 text-white'>Datos maquina</th>`;
    myTable += "</tr>    ";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>idReservation</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>startDate</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>devolutionDate</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>status</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>score</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-white bg-gray-700 px-6 py-4 text-center'>idClient</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-white bg-gray-700 px-6 py-4 text-center'>email</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-white bg-gray-700 px-6 py-4 text-center'>nombre</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-white bg-gray-700 px-6 py-4 text-center'>idMaquina</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-white bg-gray-700 px-6 py-4 text-center'>marca</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-white bg-gray-700 px-6 py-4 text-center'>nombre</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0, limit = json_reservation_list.length; i < limit; i++) {
        myTable += "<tr>";
        myTable += `<td class='border-black border-solid border-2 text-center'> ${json_reservation_list[i].idReservation}</td>`;
        let currentStartDate = String(json_reservation_list[i].startDate).slice(0, 10);
        myTable += `<td class='border-black border-solid border-2 text-center'> ${currentStartDate}</td>`;
        let currentDevolutionDate = String(json_reservation_list[i].devolutionDate).slice(0, 10);
        myTable += `<td class='border-black border-solid border-2 text-center'> ${currentDevolutionDate}</td>`;
        let currentStatus = String(json_reservation_list[i].status).toUpperCase();
        myTable += `<td class='border-black border-solid border-2 text-center'> ${currentStatus}</td>`;
        myTable += `<td class='border-black border-solid border-2 text-center'> ${json_reservation_list[i].score}</td>`;
        myTable += `<td class='border-black border-solid border-2 bg-blue-600 text-white text-center'> ${json_reservation_list[i].client.idClient}</td>`;
        myTable += `<td class='border-black border-solid border-2 bg-blue-600 text-white text-center'> ${json_reservation_list[i].client.email}</td>`;
        myTable += `<td class='border-black border-solid border-2 bg-blue-600 text-white text-center'> ${json_reservation_list[i].client.name}</td>`;
        myTable += `<td class='border-black border-solid border-2 bg-blue-500 text-white text-center'> ${json_reservation_list[i].machine.id}</td>`;
        myTable += `<td class='border-black border-solid border-2 bg-blue-500 text-white text-center'> ${json_reservation_list[i].machine.brand}</td>`;
        myTable += `<td class='border-black border-solid border-2 bg-blue-500 text-white text-center'> ${json_reservation_list[i].machine.name}</td>`;
        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#resultado2").html(myTable);
}


function loadClickEventHandlers() {
    $("#report-status").on('click', traerReporteStatus);
    $("#report-clients").on('click', traerReportesClientes);
    $("#report-dates").on('click', drawDatesBetweenForm);
}

// Asegura que la pagina este completamente cargada antes de aniadir eventos a los botones
$(function () {
    loadClickEventHandlers();
});