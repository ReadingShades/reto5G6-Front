// Endpoint: /api/Reservation/
import { URL_BASE } from './config.js';
import * as ajaxFunctions from './baseAjax.js';

export const URL_ENDPOINT_RESERVATION = `${URL_BASE}/api/Reservation`;
const NAME_ENTRY = $('#reservation-name');
const DESCRIPTION_ENTRY = $('#reservation-description');
//const CATEGORY_PROPERTIES_IDENTIFIERS = ['#reservation-name', '#reservation-description'];
const CATEGORY_PROPERTIES_IDENTIFIERS = [NAME_ENTRY, DESCRIPTION_ENTRY];
const SUBMIT_BUTTON = $('#submit-button-create');

// Preparation on load page
$(document).ready(function () {
    window.onload = loadAndDrawReservationTable();
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
/**
 * 
 * @param {Object} data - a JSON object containing the data to be sent to the server to create a new reservation
 * @param {string} data.id - the ID of the new reservation, null for new categories
 * @param {string} data.name - the name of the new reservation
 * @param {string} data.description - the description of the new reservation
 * @returns {object} - a JSON/AJAX response object containing the operation results
 */
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
    let name = $(`#reservation-name-elem-${reservationID}`).html();
    let description = $(`#reservation-description-elem-${reservationID}`).html();
    const data = {
        "id": Number(reservationID),
        "name": name,
        "description": description,
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
    let json_categories = await getReservationAll();
    //console.log(json_categories);
    drawReservationTable(json_categories);
}

function drawReservationTable(json_reservation_list) {
    let myTable = "<table class = 'table-auto min-w-full bg-blue-400'>";
    myTable += "<thead class = 'bg-blue-300 border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' colspan='11' class='text-sm font-medium text-gray-900 px-6 py-4 text-center bg-blue-100'>Reservaciones</th>";
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
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>CLIENT_DATA</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>MACHINE_DATA</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>EDIT</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center '>DELETE</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0, limit = json_reservation_list.length; i < limit; i++) {
        myTable += "<tr>";
        myTable += `<td id='reservation-id-elem-${json_reservation_list[i].idReservation}' class='border-black border-solid border-2 text-center'> ${json_reservation_list[i].idReservation}</td>`;
        myTable += `<td id='reservation-startdate-elem-${json_reservation_list[i].idReservation}' class='border-black border-solid border-2 text-center contenteditable='true''> ${json_reservation_list[i].startDate}</td>`;
        myTable += `<td id='reservation-devolutiondate-elem-${json_reservation_list[i].idReservation}' class='border-black border-solid border-2 text-center contenteditable='true''> ${json_reservation_list[i].devolutionDate}</td>`;
        myTable += `<td id='reservation-status-elem-${json_reservation_list[i].idReservation}' class='border-black border-solid border-2 text-center contenteditable='true''> ${json_reservation_list[i].status}</td>`;
        myTable += `<td id='reservation-score-elem-${json_reservation_list[i].idReservation}' class='border-black border-solid border-2 text-center contenteditable='true''> ${json_reservation_list[i].score}</td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='show-data-client-${json_reservation_list[i].id}' data-machines='${JSON.stringify(json_reservation_list[i].client)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW CLIENT</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='show-data-machine-${json_reservation_list[i].id}' data-machines='${JSON.stringify(json_reservation_list[i].machine)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW MACHINE</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='edit-data-${json_reservation_list[i].id}' class='bg-green-600 px-6 py-4 rounded focus:outline-none hover:border-green-200'>EDIT</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='delete-data-${json_categories[i].id}' class='bg-red-800 px-6 py-4 rounded focus:outline-none hover:border-red-200'>DELETE</button></td>`;
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablereservations").html(myTable);
    loadTableTriggers(json_reservation_list);
}

function showMachineData(json_machines) {
    // target table div
    let machineTable = $("#tableMachines");
    machineTable.html('');
    // Clear machine table
    let machineTableData = $('#machineTableData');
    if (machineTableData.length) {
        machineTableData.remove();
    }
    // convert json_machines string data to JSON
    json_machines = JSON.parse(json_machines);
    let myTable = "<table id='machineTableData' class = 'table-auto min-w-full bg-purple-100'>";
    myTable += "<thead class = 'bg-white border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>id</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>name</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>brand</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>year</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>description</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0; i < json_machines.length; i++) {
        myTable += "<tr class='border-b bg-gray-800 boder-gray-900'>";
        myTable += `<td id='reservation-id-elem-${json_machines[i].id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center'>${json_machines[i].id}</td>`;
        myTable += `<td id='reservation-name-elem-${json_machines[i].id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' >${json_machines[i].name}</td>`;
        myTable += `<td id='reservation-description-elem-${json_machines[i].id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' >${json_machines[i].brand}</td>`;
        myTable += `<td id='reservation-description-elem-${json_machines[i].id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' >${json_machines[i].year}</td>`;
        myTable += `<td id='reservation-description-elem-${json_machines[i].id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' >${json_machines[i].description}</td>`;
        myTable += "</tr>";
    }
    myTable += "</table>";
    machineTable.html(myTable);
};

function loadTableTriggers(json_categories) {
    for (let i = 0; i < json_categories.length; i++) {
        $(`#show-data-${json_categories[i].id}`).on('click', function () {
            let json_machines = $(`#show-data-${json_categories[i].id}`).attr('data-machines');
            showMachineData(json_machines);
        });
        $(`#edit-data-${json_categories[i].id}`).on('click', function () {
            let selectorData = getDataFields(json_categories[i].id);
            if (checkEditDataFields(selectorData)) putReservation(json_categories[i].id);
        });
        $(`#delete-data-${json_categories[i].id}`).one('click', function () {
            deleteReservationOne(json_categories[i].id);
        });
    }
}

function getDataFields(id = null) {
    if (id) {
        return ({
            "name": $(`#reservation-name-elem-${id}`).text(),
            "description": $(`#reservation-description-elem-${id}`).text(),
        });
    } else {
        return ({
            "name": NAME_ENTRY.val(),
            "description": DESCRIPTION_ENTRY.val(),
        });
    }
}

function checkEditDataFields(selectorData) {
    // pruebas de campo nombre
    let editNameText = selectorData.name;
    let isNameFieldNotEmptyTest = editNameText.length > 0;
    let isNameFieldLessThan46CharLenTest = editNameText.length < 46;
    let nameFieldTestBattery = isNameFieldNotEmptyTest && isNameFieldLessThan46CharLenTest;

    // pruebas de campo descripcion
    let editDescriptionText = selectorData.description;
    let isDescriptionFieldNotEmptyTest = editDescriptionText.length > 0;
    let isDescriptionFieldLessThan251CharLenTest = editDescriptionText.length < 251;
    let descriptionFieldTestBattery = isDescriptionFieldNotEmptyTest && isDescriptionFieldLessThan251CharLenTest;

    if (!nameFieldTestBattery || !descriptionFieldTestBattery) {
        let errorMsg = '';
        errorMsg += 'Error en entrada de datos \n';
        if (!nameFieldTestBattery) {
            errorMsg += 'El campo nombre esta mal formado (min = 0, max = 45) \n';
            errorMsg += `Campo: nombre = ${editNameText}, longitud = ${editNameText.length} \n`;
        }
        if (!descriptionFieldTestBattery) {
            errorMsg += 'El campo descripcion esta mal formado (min = 0, max = 250) \n';
            errorMsg += `Campo: descripcion = ${editDescriptionText}, longitud = ${editDescriptionText.length} \n`;
        }
        console.error(errorMsg);
        alert(errorMsg);
        return false;
    }
    return true;
}