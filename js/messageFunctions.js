// Endpoint: /api/Message/
import { URL_BASE } from './config.js';
import * as ajaxFunctions from './baseAjax.js';
import { getClientAll } from './clientFunctions.js';
import { getMachineAll } from './machineFunctions.js';

export const URL_ENDPOINT_MESSAGE = `${URL_BASE}/api/Message`;
const MESSAGE_TEXT_ENTRY = $('#message-message-text-entry');
const MACHINE_ID_ENTRY = $('#message-machine-id-entry');
const CLIENT_ID_ENTRY = $('#message-client-id-entry');
const MESSAGE_FORM_ENTRIES = {
    "messageText": MESSAGE_TEXT_ENTRY,
    "client": CLIENT_ID_ENTRY,
    "machine": MACHINE_ID_ENTRY,
}
const SUBMIT_BUTTON = $('#submit-button-create');

// Preparation on load page
$(function () {
    window.onload = loadAndDrawMessageTable();
    drawMachineCreationForm();
    drawClientCreationForm();
    loadSubmitTrigger();
    //window.onload = drawMessageCreationForm();
});

// GET
// GET:ALL
export async function getMessageAll() {
    return await ajaxFunctions.getAll(URL_ENDPOINT_MESSAGE)
        .then(response => {
            //console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// GET:ONE
export async function getMessageOne(messageID) {
    return await ajaxFunctions.getOne(URL_ENDPOINT_MESSAGE, messageID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// POST
async function postMessage(data) {
    //console.log(data);
    let ajaxResponse = await ajaxFunctions.postObject(URL_ENDPOINT_MESSAGE, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawMessageTable();
    return ajaxResponse;
}
// PUT
async function putMessage(data) {
    let response = await ajaxFunctions.putObject(URL_ENDPOINT_MESSAGE, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawMessageTable();
    return response;
}
// DELETE
// DELETE:ALL
export async function deleteMessageAll() {
    await ajaxFunctions.deleteAll(URL_ENDPOINT_MESSAGE)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawMessageTable();
}
// DELETE:ONE
export async function deleteMessageOne(messageID) {
    await ajaxFunctions.deleteOne(URL_ENDPOINT_MESSAGE, messageID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawMessageTable();
}

async function loadAndDrawMessageTable() {
    let json_message_list = await getMessageAll();
    //console.log(json_message_list);
    drawMessageTable(json_message_list);
}

function drawMessageTable(json_message_list) {
    // target table div
    let messageTable = $("#table-messages");
    messageTable.html('');
    // Clear message table
    let messageTableData = $('#message-table-data');
    if (messageTableData.length) {
        messageTableData.remove();
    }
    let myTable = `<h1 class='title-font font-medium text-3xl text-gray-900 justify-center text-center'> Mensajes registrados </h1><br>`
    myTable += "<table id='message-table-data' class = 'table-auto min-w-full bg-purple-100'>";
    myTable += "<thead class = 'bg-white border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>idMessage</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>messageText</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>MACHINE DATA</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>CLIENT DATA</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>EDIT</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center '>DELETE</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0; i < json_message_list.length; i++) {
        let idMessage = json_message_list[i].idMessage;
        myTable += "<tr class='border-b bg-gray-800 border-gray-900'>";
        myTable += `<td id='message-id-elem-${idMessage}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center'>${idMessage}</td>`;
        myTable += `<td id='message-message-text-elem-${idMessage}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_message_list[i].messageText}</td>`;
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='show-data-machine-${idMessage}' data-machine='${JSON.stringify(json_message_list[i].machine)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW MACHINE</button></td> `;
        myTable += `<td td class='text-sm text-white font-light whitespace-nowrap' > <button id='show-data-client-${idMessage}' data-client='${JSON.stringify(json_message_list[i].client)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW CLIENT</button></td> `;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap' > <button type='button' id='edit-data-${idMessage}' class='bg-green-600 px-6 py-4 rounded focus:outline-none hover:border-green-200'>EDIT</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap' > <button type='button' id='delete-data-${idMessage}' class='bg-red-800 px-6 py-4 rounded focus:outline-none hover:border-red-200'>DELETE</button></td>`;
        myTable += "</tr>";
    }
    myTable += "</table>";
    messageTable.html(myTable);
    $("#message-data-section").show();
    loadTableTriggers(json_message_list);
}

function loadSubmitTrigger() {
    SUBMIT_BUTTON.on('click', async function () {
        let selectorData = getDataFields();
        //console.log(selectorData);
        // if (checkEditDataFields(selectorData)) {
        //     let status = await postMessage(selectorData);
        //     console.log(status);
        // }
        let status = await postMessage(selectorData);
        console.log(status);
    });
}

async function drawMachineCreationForm() {
    // client input options
    let selectionMachineOptionsTarget = $("#message-machine-id-entry");
    let selectionMachineOptions = "";
    let machineList = await getMachineAll();
    //console.log(clientList);    
    if (machineList.length > 0) {
        for (let i = 0, limit = machineList.length; i < limit; i++) {
            //console.log(clientList[i]);
            selectionMachineOptions += `<option class='text-sm' value=${machineList[i].id}>{id: ${machineList[i].id}, name: ${machineList[i].name}}</option>`;
        }
    } else {
        selectionMachineOptions += `<option></option>`;
    }
    selectionMachineOptionsTarget.append(selectionMachineOptions);
}

async function drawClientCreationForm() {
    // client input options
    let selectionClientOptionsTarget = $("#message-client-id-entry");
    let selectionClientOptions = "";
    let clientList = await getClientAll();
    //console.log(clientList);    
    if (clientList.length > 0) {
        for (let i = 0, limit = clientList.length; i < limit; i++) {
            //console.log(clientList[i]);
            selectionClientOptions += `<option class='text-sm' value=${clientList[i].idClient}>{id: ${clientList[i].idClient}, name: ${clientList[i].name}}</option>`;
        }
    } else {
        selectionClientOptions += `<option></option>`;
    }
    selectionClientOptionsTarget.append(selectionClientOptions);
}

function loadTableTriggers(json_message_list) {
    for (let i = 0; i < json_message_list.length; i++) {
        let idMessage = json_message_list[i].idMessage;
        $(`#show-data-machine-${idMessage}`).on('click', function () {
            let json_machine = $(`#show-data-machine-${idMessage}`).attr('data-machine');
            //console.log(json_machine);
            showMachineData(idMessage, json_machine);
        });
        $(`#show-data-client-${idMessage}`).on('click', function () {
            let json_client = $(`#show-data-client-${idMessage}`).attr('data-client');
            //console.log(json_client);
            showClientData(idMessage, json_client);
        });
        $(`#edit-data-${idMessage}`).on('click', function () {
            let selectorData = getDataFields(idMessage);
            //console.log(selectorData);
            //if (checkEditDataFields(selectorData)) putMessage(idMessage);
            putMessage(selectorData);
        });
        $(`#delete-data-${idMessage}`).one('click', function () {
            deleteMessageOne(idMessage);
        });
    }
}

function getDataFields(id = null) {
    if (id) {
        return ({
            "idMessage": $(`#message-id-elem-${id}`).html(),
            "messageText": $(`#message-message-text-elem-${id}`).html(),
            "client": { "idClient": Number($(`#message-client-id-elem-${id}`).html()) },
            "machine": { "id": Number($(`#message-machine-id-elem-${id}`).html(),) },
        });
    } else {
        return ({
            "messageText": MESSAGE_FORM_ENTRIES.messageText.val(),
            "client": { "idClient": Number(MESSAGE_FORM_ENTRIES.client.val()) },
            "machine": { "id": Number(MESSAGE_FORM_ENTRIES.machine.val()) },
        });
    }
}

function showMachineData(idMessage, json_machine) {
    // target table div
    let machineTable = $("#table-machine");
    machineTable.html('');
    // Clear machine table
    let machineTableData = $('#machine-table-data');
    if (machineTableData.length) {
        machineTableData.remove();
    }
    // convert json_machine string data to JSON
    //console.log(json_machine);
    json_machine = JSON.parse(json_machine);
    let myTable = `<br /><h1 class='title-font font-medium text-3xl text-gray-900 justify-center text-center'> Message #${idMessage}: Datos maquina </h1><br/>`;
    myTable += "<table id='machinetabledata' class = 'table-auto min-w-full bg-purple-100'>";
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
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.id}</ > `;
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.name}</ > `;
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.brand}</ > `;
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.year}</ > `;
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_machine.description}</ > `;
    myTable += "</tr>";
    myTable += "</table>";
    machineTable.html(myTable);
}

function showClientData(idMessage, json_client) {
    // target table div
    let clientTable = $("#table-client");
    clientTable.html('');
    // Clear client table
    let clientTableData = $('#client-table-data');
    if (clientTableData.length) {
        clientTableData.remove();
    }
    // convert json_client string data to JSON
    console.log(json_client);
    json_client = JSON.parse(json_client);
    let myTable = `<br /><h1 class='title-font font-medium text-3xl text-gray-900 justify-center text-center'> Message #${idMessage}: Datos cliente </h1><br/>`;
    myTable += "<table id='clientTableData' class = 'table-auto min-w-full bg-purple-100'>";
    myTable += "<thead class = 'bg-white border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>idClient</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>email</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>name</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>age</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    myTable += "<tr class='border-b bg-gray-800 boder-gray-900'>";
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_client.idClient}</ > `;
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_client.email}</ > `;
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_client.name}</ > `;
    myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' > ${json_client.age}</ > `;
    myTable += "</tr>";
    myTable += "</table>";
    clientTable.html(myTable);
}