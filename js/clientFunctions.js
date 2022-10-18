// Endpoint: /api/Client/
import { URL_BASE } from './config.js';
import * as ajaxFunctions from './baseAjax.js';

export const URL_ENDPOINT_CLIENT = `${URL_BASE}/api/Client`;
const EMAIL_ENTRY = $('#client-email-entry');
const NAME_ENTRY = $('#client-name-entry');
const PASSWORD_ENTRY = $('#client-password-entry');
const AGE_ENTRY = $('#client-age-entry');
const CLIENT_FORM_ENTRIES = {
    "name": NAME_ENTRY,
    "email": EMAIL_ENTRY,
    "password": PASSWORD_ENTRY,
    "age": AGE_ENTRY,
}
const SUBMIT_BUTTON = $('#submit-button-create');

// Preparation on load page
$(function () {
    window.onload = loadAndDrawClientTable();
    loadSubmitTrigger();
    //window.onload = drawClientCreationForm();
});

// GET
// GET:ALL
export async function getClientAll() {
    return await ajaxFunctions.getAll(URL_ENDPOINT_CLIENT)
        .then(response => {
            //console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// GET:ONE
export async function getClientOne(clientID) {
    return await ajaxFunctions.getOne(URL_ENDPOINT_CLIENT, clientID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// POST
async function postClient(data) {
    //console.log(data);
    let ajaxResponse = await ajaxFunctions.postObject(URL_ENDPOINT_CLIENT, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawClientTable();
    return ajaxResponse;
}
// PUT
async function putClient(data) {
    let response = await ajaxFunctions.putObject(URL_ENDPOINT_CLIENT, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawClientTable();
    return response;
}
// DELETE
// DELETE:ALL
export async function deleteClientAll() {
    await ajaxFunctions.deleteAll(URL_ENDPOINT_CLIENT)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawClientTable();
}
// DELETE:ONE
export async function deleteClientOne(clientID) {
    await ajaxFunctions.deleteOne(URL_ENDPOINT_CLIENT, clientID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawClientTable();
}

async function loadAndDrawClientTable() {
    let json_client_list = await getClientAll();
    //console.log(json_client_list);
    drawClientTable(json_client_list);
}

function drawClientTable(json_client_list) {
    // target table div
    let clientTable = $("#table-clients");
    clientTable.html('');
    // Clear client table
    let clientTableData = $('#client-table-data');
    if (clientTableData.length) {
        clientTableData.remove();
    }
    let myTable = `<h1 class='title-font font-medium text-3xl text-gray-900 justify-center text-center'> Clientes registrados </h1><br>`
    myTable += "<table id='client-table-data' class = 'table-auto min-w-full bg-purple-100'>";
    myTable += "<thead class = 'bg-white border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>idClient</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>name</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>email</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>password</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>age</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>EDIT</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center '>DELETE</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0; i < json_client_list.length; i++) {
        let idClient = json_client_list[i].idClient;
        myTable += "<tr class='border-b bg-gray-800 border-gray-900'>";
        myTable += `<td id='client-id-elem-${idClient}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center'>${idClient}</td>`;
        myTable += `<td id='client-name-elem-${idClient}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_client_list[i].name}</td>`;
        myTable += `<td id='client-email-elem-${idClient}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_client_list[i].email}</td>`;
        myTable += `<td id='client-password-elem-${idClient}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_client_list[i].password}</td>`;
        myTable += `<td id='client-age-elem-${idClient}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_client_list[i].age}</td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap' > <button type='button' id='edit-data-${idClient}' class='bg-green-600 px-6 py-4 rounded focus:outline-none hover:border-green-200'>EDIT</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap' > <button type='button' id='delete-data-${idClient}' class='bg-red-800 px-6 py-4 rounded focus:outline-none hover:border-red-200'>DELETE</button></td>`;
        myTable += "</tr>";
    }
    myTable += "</table>";
    clientTable.html(myTable);
    $("#client-data-section").show();
    loadTableTriggers(json_client_list);
}

function loadSubmitTrigger() {
    SUBMIT_BUTTON.on('click', async function () {
        let selectorData = getDataFields();
        //console.log(selectorData);
        // if (checkEditDataFields(selectorData)) {
        //     let status = await postClient(selectorData);
        //     console.log(status);
        // }
        let status = await postClient(selectorData);
        console.log(status);
    });
}

function loadTableTriggers(json_client_list) {
    for (let i = 0; i < json_client_list.length; i++) {
        let idClient = json_client_list[i].idClient;
        $(`#edit-data-${idClient}`).on('click', function () {
            let selectorData = getDataFields(idClient);
            //console.log(selectorData);
            //if (checkEditDataFields(selectorData)) putClient(idClient);
            putClient(selectorData);
        });
        $(`#delete-data-${idClient}`).one('click', function () {
            deleteClientOne(idClient);
        });
    }
}

function getDataFields(id = null) {
    if (id) {
        return ({
            "idClient": $(`#client-id-elem-${id}`).html(),
            "name": $(`#client-name-elem-${id}`).html(),
            "email": $(`#client-email-elem-${id}`).html(),
            "password": $(`#client-password-elem-${id}`).html(),
            "age": Number($(`#client-age-elem-${id}`).html()),
        });
    } else {
        return ({
            "name": CLIENT_FORM_ENTRIES.name.val(),
            "email": CLIENT_FORM_ENTRIES.email.val(),
            "password": CLIENT_FORM_ENTRIES.password.val(),
            "age": CLIENT_FORM_ENTRIES.age.val(),
        });
    }
}