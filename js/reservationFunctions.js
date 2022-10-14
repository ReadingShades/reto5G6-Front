// Endpoint: /api/Reservation/
import { URL_BASE } from './config.js';
import * as ajaxFunctions from './baseAjax.js';

export const URL_ENDPOINT_RESERVATION = `${URL_BASE}/api/Reservation`;
const STARTDATE_ENTRY = $('#reservation-startdate-entry');
const DEVOLUTIONDATE_ENTRY = $('#reservation-devolutiondate-entry');
const STATUS_ENTRY = $('#reservation-status-entry');
const SCORE_ENTRY = $('#reservation-SCORE-entry');
const RESERVATION_PROPERTIES_IDENTIFIERS = [STATUS_ENTRY, DEVOLUTIONDATE_ENTRY, STATUS_ENTRY, SCORE_ENTRY];
const SUBMIT_BUTTON = $('#submit-button-create');

// Preparation on load page
$(function () {
    window.onload = loadAndDrawReservationTable();
    let json_reservation_list = getReservationAll();
    drawReservationTable(json_reservation_list);
    SUBMIT_BUTTON.on('click', async function () {
        let selectorData = getDataFields();
        if (checkEditDataFields(selectorData)) {
            let status = await postReservation(selectorData);
            console.log(status);
        }
    });
});

// GET
// GET:ALL
export async function getReservationAll() {
    return await ajaxFunctions.getAll(URL_ENDPOINT_RESERVATION)
        .then(response => {
            //console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// GET:ONE
export async function getReservationOne(reservationID) {
    return await ajaxFunctions.getOne(URL_ENDPOINT_RESERVATION, reservationID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// POST
async function postReservation(data) {
    //console.log(data);    
    let ajaxResponse = await ajaxFunctions.postObject(URL_ENDPOINT_RESERVATION, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    cleanFormEntries(...CATEGORY_PROPERTIES_IDENTIFIERS);
    loadAndDrawReservationTable();
    return ajaxResponse;
}
// PUT
async function putReservation(reservationID) {
    let startDate = $(`#reservation-startdate-elem-${reservationID}`).val();
    let devolutionDate = $(`#reservation-devolutiondate-elem-${reservationID}`).val();
    let status = $(`#reservation-status-elem-${reservationID}`).val();
    let score = $(`#reservation-score-elem-${reservationID}`).val();
    const data = {
        "idReservation": Number(reservationID),
        "startDate": startDate,
        "devolutionDate": devolutionDate,
        "status": status,
        "score": Number(score),
    }
    let response = await ajaxFunctions.putObject(URL_ENDPOINT_RESERVATION, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawReservationTable();
    return response;
}
// DELETE
// DELETE:ALL
export async function deleteReservationAll() {
    await ajaxFunctions.deleteAll(URL_ENDPOINT_RESERVATION)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawReservationTable();
}
// DELETE:ONE
export async function deleteReservationOne(reservationID) {
    await ajaxFunctions.deleteOne(URL_ENDPOINT_RESERVATION, reservationID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawReservationTable();
}

// Utilities
function cleanFormEntries(...args) {
    args.forEach(elem => {
        elem.val('');
    });
}

async function loadAndDrawReservationTable() {
    let json_reservation_list = await getReservationAll();
    //console.log(json_reservation_list);
    drawReservationTable(json_reservation_list);
}

function drawReservationTable(json_reservation_list) {
    let myTable = "<table class = 'table-auto min-w-full bg-blue-400'>";
    myTable += "<thead class = 'bg-blue-300 border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' colspan='9' class='text-sm font-medium text-gray-900 px-6 py-4 text-center bg-blue-100'>Reservaciones</th>";
    myTable += "</tr>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>idReservation</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>startDate</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>devolutionDate</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>status</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>score</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>CLIENT_DATA</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>MACHINE_DATA</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>EDIT</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center '>DELETE</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0, limit = json_reservation_list.length; i < limit; i++) {
        let idReservation = json_reservation_list[i].idReservation
        myTable += "<tr>";
        myTable += `<td id='reservation-id-elem-${idReservation}' class='border-black border-solid border-2 text-center'> ${idReservation}</td>`;
        let currentStartDate = String(json_reservation_list[i].startDate).slice(0, 10);
        myTable += `<td class='border-black border-solid border-2 text-center' contenteditable='true'><input id='reservation-startdate-elem-${idReservation}' type='date' value=${currentStartDate}></td>`;
        let currentDevolutionDate = String(json_reservation_list[i].devolutionDate).slice(0, 10);
        myTable += `<td class='border-black border-solid border-2 text-center' contenteditable='true'><input id='reservation-devolutiondate-elem-${idReservation}' type='date' value=${currentDevolutionDate}></td>`;
        let currentStatus = json_reservation_list[i].status;
        myTable += "<td class='border-black border-solid border-2 text-center' contenteditable='true'>";
        myTable += `<select name="currentStatus" id='reservation-status-elem-${idReservation}'>`;
        let selectedStatusOption = [];
        selectedStatusOption.push(currentStatus == "created" ? "selected" : "");
        selectedStatusOption.push(currentStatus == "cancelled" ? "selected" : "");
        selectedStatusOption.push(currentStatus == "completed" ? "selected" : "");
        myTable += `<option ${selectedStatusOption[0]} value='created'>Created</option>`;
        myTable += `<option ${selectedStatusOption[1]} value='cancelled'>Cancelled</option>`;
        myTable += `<option ${selectedStatusOption[2]} value='completed'>Completed</option>`;
        myTable += "</select >";
        myTable += "</td >";
        let currentScore = json_reservation_list[i].score;
        //console.log(currentScore, typeof currentScore);
        myTable += `<td td class='border-black border-solid border-2 text-center' contenteditable = 'true' >`
        myTable += `<select name="currentScore" id='reservation-score-elem-${idReservation}'>`;
        let selectedScoreOption = [];
        selectedScoreOption.push(currentScore == "null" || 0 ? "selected" : "");
        selectedScoreOption.push(currentScore == 1 ? "selected" : "");
        selectedScoreOption.push(currentScore == 2 ? "selected" : "");
        selectedScoreOption.push(currentScore == 3 ? "selected" : "");
        selectedScoreOption.push(currentScore == 4 ? "selected" : "");
        selectedScoreOption.push(currentScore == 5 ? "selected" : "");
        myTable += `<option ${selectedScoreOption[0]} value=0>0</option>`;
        myTable += `<option ${selectedScoreOption[1]} value=1>1</option>`;
        myTable += `<option ${selectedScoreOption[2]} value=2>2</option>`;
        myTable += `<option ${selectedScoreOption[3]} value=3>3</option>`;
        myTable += `<option ${selectedScoreOption[4]} value=4>4</option>`;
        myTable += `<option ${selectedScoreOption[5]} value=5>5</option>`;
        myTable += "</select >";
        myTable += "</td >";
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='show-data-client-${idReservation}' data-client='${JSON.stringify(json_reservation_list[i].client)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW CLIENT</button></td> `;
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='show-data-machine-${idReservation}' data-machine='${JSON.stringify(json_reservation_list[i].machine)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW MACHINE</button></td> `;
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='edit-data-${idReservation}' class='bg-green-600 px-6 py-4 rounded focus:outline-none hover:border-green-200'>EDIT</button></td> `;
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='delete-data-${idReservation}' class='bg-red-800 px-6 py-4 rounded focus:outline-none hover:border-red-200'>DELETE</button></td> `;
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablereservations").html(myTable);
    loadTableTriggers(json_reservation_list);
}

function showMachineData(idReserva, json_machine) {
    // target table div
    let machineTable = $("#tableMachines");
    machineTable.html('');
    // Clear machine table
    let machineTableData = $('#machineTableData');
    if (machineTableData.length) {
        machineTableData.remove();
    }
    // convert json_machine string data to JSON
    //console.log(json_machine);
    json_machine = JSON.parse(json_machine);
    let myTable = `< br /><h1 class='title-font font-medium text-3xl text-gray-900 justify-center text-center'> Maquina para la reserva #${idReserva} </h1><br/>`;
    myTable += "<table id='machineTableData' class = 'table-auto min-w-full bg-purple-100'>";
    myTable += "<thead class = 'bg-white border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>id</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>name</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>brand</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>year</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>description</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    myTable += "<tr class='border-b bg-gray-800 boder-gray-900'>";
    myTable += `< td id = 'reservation-id-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.id}</ > `;
    myTable += `< td id = 'reservation-name-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.name}</ > `;
    myTable += `< td id = 'reservation-description-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.brand}</ > `;
    myTable += `< td id = 'reservation-description-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.year}</ > `;
    myTable += `< td id = 'reservation-description-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.description}</ > `;
    myTable += "</tr>";
    myTable += "</table>";
    machineTable.html(myTable);
};

function loadTableTriggers(json_reservation_list) {
    for (let i = 0; i < json_reservation_list.length; i++) {
        let idReserva = json_reservation_list[i].idReservation;
        $(`#show-data-machine-${idReserva}`).on('click', function () {
            let json_machines = $(`#show-data-machine-${idReserva}`).attr('data-machine');
            //console.log(json_machines);
            showMachineData(idReserva, json_machines);
        });
        $(`#show-data-client-${idReserva}`).on('click', function () {
            let json_machines = $(`#show-data-client-${idReserva}`).attr('data-client');
            showMachineData(json_machines);
        });
        $(`#edit-data-${idReserva}`).on('click', function () {
            let selectorData = getDataFields(idReserva);
            console.log(selectorData);
            if (checkEditDataFields(selectorData)) putReservation(idReserva);
        });
        $(`#delete-data-${idReserva}`).one('click', function () {
            deleteReservationOne(idReserva);
        });
    }
}

function getDataFields(id = null) {
    if (id) {
        return ({
            "startDate": $(`#reservation-startdate-elem-${id}`).val(),
            "devolutionDate": $(`#reservation-devolutiondate-elem-${id}`).val(),
            "status": $(`#reservation-status-elem-${id}`).val(),
            "score": $(`#reservation-score-elem-${id}`).val(),
        });
    } else {
        return ({
            "startDate": STARTDATE_ENTRY.val(),
            "devolutionDate": DEVOLUTIONDATE_ENTRY.val(),
            "status": STATUS_ENTRY.val(),
            "score": SCORE_ENTRY.val(),
        });
    }
}

function checkEditDataFields(selectorData) {
    // date format tests
    let startDateValue = selectorData.startDate;
    let devolutionDateValue = selectorData.devolutionDate;

    let startDateLengthTest = startDateValue.length == 10;
    let devolutionDateLengthTest = devolutionDateValue.length == 10;
    let dateTestBattery = startDateLengthTest && devolutionDateLengthTest;
    // status tests
    let statusValue = selectorData.status;
    let statusMinLenght = statusValue.length > 0;
    let statusMaxLenght = statusValue.length < 10;
    let statusTestBattery = statusMinLenght && statusMaxLenght;

    // score tests
    let scoreValue = selectorData.score;
    let scoreNullValueTest = (scoreValue == null) || (scoreValue >= 0);
    let scoreBoundaryTest = scoreValue < 6;
    let scoreTestBattery = scoreNullValueTest && scoreBoundaryTest;

    if (!dateTestBattery || !statusTestBattery || !scoreTestBattery) {
        let errorMsg = '';
        errorMsg += 'Error en entrada de datos \n';
        console.error(errorMsg);
        alert(errorMsg);
        return false;
    }
    return true;
}