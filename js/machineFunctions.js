// Endpoint: /api/Machine/
import { URL_BASE } from './config.js';
import * as ajaxFunctions from './baseAjax.js';

export const URL_ENDPOINT_MACHINE = `${URL_BASE}/api/Machine`;
const STARTDATE_ENTRY = $('#machine-startdate-entry');
const DEVOLUTIONDATE_ENTRY = $('#machine-devolutiondate-entry');
const STATUS_ENTRY = $('#machine-status-entry');
const SCORE_ENTRY = $('#machine-score-entry');
const CLIENT_ENTRY = $('#machine-client-entry');
const MACHINE_ENTRY = $('#machine-machine-entry');
const MACHINE_FORM_ENTRIES = [STATUS_ENTRY, DEVOLUTIONDATE_ENTRY, STATUS_ENTRY, SCORE_ENTRY, CLIENT_ENTRY, MACHINE_ENTRY];
const SUBMIT_BUTTON = $('#submit-button-create');

// Preparation on load page
$(function () {
    window.onload = loadAndDrawMachineTable();
    window.onload = drawMachineCreationForm();
    let json_machine_list = getMachineAll();
    drawMachineTable(json_machine_list);
    SUBMIT_BUTTON.on('click', async function () {
        let selectorData = getDataFields();
        if (checkEditDataFields(selectorData)) {
            let status = await postMachine(selectorData);
            console.log(status);
        }
    });
});

// GET
// GET:ALL
export async function getMachineAll() {
    return await ajaxFunctions.getAll(URL_ENDPOINT_MACHINE)
        .then(response => {
            //console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// GET:ONE
export async function getMachineOne(machineID) {
    return await ajaxFunctions.getOne(URL_ENDPOINT_MACHINE, machineID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// POST
async function postMachine(data) {
    //console.log(data);
    let ajaxResponse = await ajaxFunctions.postObject(URL_ENDPOINT_MACHINE, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    cleanFormEntries(...MACHINE_FORM_ENTRIES);
    loadAndDrawMachineTable();
    return ajaxResponse;
}
// PUT
async function putMachine(machineID) {
    let startDate = $(`#machine-startdate-elem-${machineID}`).val();
    let devolutionDate = $(`#machine-devolutiondate-elem-${machineID}`).val();
    let status = $(`#machine-status-elem-${machineID}`).val();
    let score = $(`#machine-score-elem-${machineID}`).val();
    const data = {
        "idMachine": Number(machineID),
        "startDate": startDate,
        "devolutionDate": devolutionDate,
        "status": status,
        "score": Number(score),
    }
    let response = await ajaxFunctions.putObject(URL_ENDPOINT_MACHINE, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawMachineTable();
    return response;
}
// DELETE
// DELETE:ALL
export async function deleteMachineAll() {
    await ajaxFunctions.deleteAll(URL_ENDPOINT_MACHINE)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawMachineTable();
}
// DELETE:ONE
export async function deleteMachineOne(machineID) {
    await ajaxFunctions.deleteOne(URL_ENDPOINT_MACHINE, machineID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawMachineTable();
}

// Utilities
function cleanFormEntries(...args) {
    args.forEach(elem => {
        elem.val('');
    });
}

async function loadAndDrawMachineTable() {
    let json_machine_list = await getMachineAll();
    //console.log(json_machine_list);
    drawMachineTable(json_machine_list);
}

function drawMachineTable(json_machine_list) {
    let myTable = "<table class = 'table-auto min-w-full bg-blue-400'>";
    // Table heading
    // 9 elements: idMachine | startDate | devolutionDate | status | score
    // SHOW_CLIENT | SHOW_MACHINE | EDIT_BUTTON | DELETE_BUTTON
    myTable += "<thead class = 'bg-blue-300 border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' colspan='9' class='text-sm font-medium text-gray-900 px-6 py-4 text-center bg-blue-100'>Reservaciones</th>";
    myTable += "</tr>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>idMachine</th>";
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
    for (let i = 0, limit = json_machine_list.length; i < limit; i++) {
        let idMachine = json_machine_list[i].idMachine
        myTable += "<tr>";
        myTable += `<td id='machine-id-elem-${idMachine}' class='border-black border-solid border-2 text-center'> ${idMachine}</td>`;
        let currentStartDate = String(json_machine_list[i].startDate).slice(0, 10);
        myTable += `<td class='border-black border-solid border-2 text-center' contenteditable='true'><input id='machine-startdate-elem-${idMachine}' type='date' value=${currentStartDate}></td>`;
        let currentDevolutionDate = String(json_machine_list[i].devolutionDate).slice(0, 10);
        myTable += `<td class='border-black border-solid border-2 text-center' contenteditable='true'><input id='machine-devolutiondate-elem-${idMachine}' type='date' value=${currentDevolutionDate}></td>`;
        let currentStatus = json_machine_list[i].status;
        myTable += "<td class='border-black border-solid border-2 text-center' contenteditable='true'>";
        myTable += `<select name="currentStatus" id='machine-status-elem-${idMachine}'>`;
        let selectedStatusOption = [];
        selectedStatusOption.push(currentStatus == "created" ? "selected" : "");
        selectedStatusOption.push(currentStatus == "cancelled" ? "selected" : "");
        selectedStatusOption.push(currentStatus == "completed" ? "selected" : "");
        myTable += `<option ${selectedStatusOption[0]} value='created'>Created</option>`;
        myTable += `<option ${selectedStatusOption[1]} value='cancelled'>Cancelled</option>`;
        myTable += `<option ${selectedStatusOption[2]} value='completed'>Completed</option>`;
        myTable += "</select >";
        myTable += "</td >";
        let currentScore = json_machine_list[i].score;
        //console.log(currentScore, typeof currentScore);
        myTable += `<td td class='border-black border-solid border-2 text-center' contenteditable = 'true' >`
        myTable += `<select name="currentScore" id='machine-score-elem-${idMachine}'>`;
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
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='show-data-client-${idMachine}' data-client='${JSON.stringify(json_machine_list[i].client)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW CLIENT</button></td> `;
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='show-data-machine-${idMachine}' data-machine='${JSON.stringify(json_machine_list[i].machine)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW MACHINE</button></td> `;
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='edit-data-${idMachine}' class='bg-green-600 px-6 py-4 rounded focus:outline-none hover:border-green-200'>EDIT</button></td> `;
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='delete-data-${idMachine}' class='bg-red-800 px-6 py-4 rounded focus:outline-none hover:border-red-200'>DELETE</button></td> `;
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablemachines").html(myTable);
    loadTableTriggers(json_machine_list);
}

function drawMachineCreationForm() {
    let formLocation = $("#machine-creation-form");
    let myForm = "<section class='container flex items-center justify-center'>";
    myForm += "<form>"
    /** model
     <div class="relative mb-4">
     <label for="category-name" class="leading-7 text-sm text-gray-600">
     Nombre
     </label>
     <input type="text" id="category-name" name="category-name" minlength="1" maxlength="45" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
     </div>
     */
    // submit button. type is set to 'button' to prevent form default reload
    // behaviour
    myForm += "<button id='submit-button-create' type='button' class='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Crear</button>";
    myForm += "</form>"
    myForm += "</section>";
    formLocation.html(myForm);
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
    myTable += `< td id = 'machine-id-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.id}</ > `;
    myTable += `< td id = 'machine-name-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.name}</ > `;
    myTable += `< td id = 'machine-description-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.brand}</ > `;
    myTable += `< td id = 'machine-description-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.year}</ > `;
    myTable += `< td id = 'machine-description-elem-${json_machine.id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.description}</ > `;
    myTable += "</tr>";
    myTable += "</table>";
    machineTable.html(myTable);
};

function loadTableTriggers(json_machine_list) {
    for (let i = 0; i < json_machine_list.length; i++) {
        let idReserva = json_machine_list[i].idMachine;
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
            if (checkEditDataFields(selectorData)) putMachine(idReserva);
        });
        $(`#delete-data-${idReserva}`).one('click', function () {
            deleteMachineOne(idReserva);
        });
    }
}

function getDataFields(id = null) {
    if (id) {
        return ({
            "startDate": $(`#machine-startdate-elem-${id}`).val(),
            "devolutionDate": $(`#machine-devolutiondate-elem-${id}`).val(),
            "status": $(`#machine-status-elem-${id}`).val(),
            "score": $(`#machine-score-elem-${id}`).val(),
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