// Endpoint: /api/Machine/
import { URL_BASE } from './config.js';
import { getCategoryAll } from './categoryFunctions.js';
import * as ajaxFunctions from './baseAjax.js';

export const URL_ENDPOINT_MACHINE = `${URL_BASE}/api/Machine`;
const NAME_ENTRY = $('#machine-name-entry');
const DESCRIPTION_ENTRY = $('#machine-description-entry');
const BRAND_ENTRY = $('#machine-brand-entry');
const YEAR_ENTRY = $('#machine-year-entry');
const CATEGORY_ID_ENTRY = $('#machine-category-entry');
const MACHINE_FORM_ENTRIES = {
    "name": NAME_ENTRY,
    "description": DESCRIPTION_ENTRY,
    "brand": BRAND_ENTRY,
    "year": YEAR_ENTRY,
    "category_id": CATEGORY_ID_ENTRY
};
const SUBMIT_BUTTON = $('#submit-button-create');

// Preparation on load page
$(function () {
    window.onload = loadAndDrawMachineTable();
    window.onload = drawMachineCreationForm();
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
    //cleanFormEntries(...MACHINE_FORM_ENTRIES);
    loadAndDrawMachineTable();
    return ajaxResponse;
}
// PUT
async function putMachine(data) {
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
    // target table div
    let machineTable = $("#table-machines");
    machineTable.html('');
    // Clear machine table
    let machineTableData = $('#machinetabledata');
    if (machineTableData.length) {
        machineTableData.remove();
    }
    let myTable = `<h1 class='title-font font-medium text-3xl text-gray-900 justify-center text-center'> Maquinas Disponibles </h1><br>`
    myTable += "<table id='machinetabledata' class = 'table-auto min-w-full bg-purple-100'>";
    myTable += "<thead class = 'bg-white border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>id</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>name</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>brand</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>year</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>description</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>CATEGORY DATA</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>EDIT</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center '>DELETE</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0; i < json_machine_list.length; i++) {
        let idMachine = json_machine_list[i].id;
        myTable += "<tr class='border-b bg-gray-800 border-gray-900'>";
        myTable += `<td id='machine-id-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' data-category-id=${JSON.stringify(json_machine_list[i].category.id)}>${idMachine}</td>`;
        myTable += `<td id='machine-name-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_machine_list[i].name}</td>`;
        myTable += `<td id='machine-brand-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_machine_list[i].brand}</td>`;
        myTable += `<td id='machine-year-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_machine_list[i].year}</td>`;
        myTable += `<td id='machine-description-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' contenteditable>${json_machine_list[i].description}</td>`;
        myTable += `<td class='flex flex-col items-center text-sm text-white font-light whitespace-nowrap'><button type='button' id='show-data-category-${idMachine}' data-category='${JSON.stringify(json_machine_list[i].category)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap' > <button type='button' id='edit-data-${idMachine}' class='bg-green-600 px-6 py-4 rounded focus:outline-none hover:border-green-200'>EDIT</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap' > <button type='button' id='delete-data-${idMachine}' class='bg-red-800 px-6 py-4 rounded focus:outline-none hover:border-red-200'>DELETE</button></td>`;
        myTable += "</tr>";
    }
    myTable += "</table>";
    machineTable.html(myTable);
    $("#machine-data-section").show();
    loadTableTriggers(json_machine_list);
}

async function drawMachineCreationForm() {
    // client input options
    let selectionCategoryOptionsTarget = $("#machine-category-entry");
    let selectionCategoryOptions = "";
    let categoryList = await getCategoryAll();
    //console.log(clientList);    
    if (categoryList.length > 0) {
        for (let i = 0, limit = categoryList.length; i < limit; i++) {
            //console.log(clientList[i]);
            selectionCategoryOptions += `<option class='text-sm' value=${categoryList[i].id}>{id: ${categoryList[i].id}, name: ${categoryList[i].name}}</option>`;
        }
    } else {
        selectionCategoryOptions += `<option></option>`;
    }
    selectionCategoryOptionsTarget.append(selectionCategoryOptions);
    loadSubmitTrigger();
}

function loadSubmitTrigger() {
    SUBMIT_BUTTON.on('click', async function () {
        let selectorData = getDataFields();
        //console.log(selectorData);
        // if (checkEditDataFields(selectorData)) {
        //     let status = await postMachine(selectorData);
        //     console.log(status);
        // }
        let status = await postMachine(selectorData);
        console.log(status);
    });
}

function loadTableTriggers(json_machine_list) {
    for (let i = 0; i < json_machine_list.length; i++) {
        let idMachine = json_machine_list[i].id;
        $(`#show-data-category-${idMachine}`).on('click', function () {
            let json_machines = $(`#show-data-client-${idMachine}`).attr('data-client');
            showMachineData(json_machines);
        });
        $(`#edit-data-${idMachine}`).on('click', function () {
            let selectorData = getDataFields(idMachine);
            //console.log(selectorData);
            //if (checkEditDataFields(selectorData)) putMachine(idMachine);
            putMachine(selectorData);
        });
        $(`#delete-data-${idMachine}`).one('click', function () {
            deleteMachineOne(idMachine);
        });
    }
}

function getDataFields(id = null) {
    if (id) {
        return ({
            "id": $(`#machine-id-elem-${id}`).html(),
            "name": $(`#machine-name-elem-${id}`).html(),
            "description": $(`#machine-description-elem-${id}`).html(),
            "brand": $(`#machine-brand-elem-${id}`).html(),
            "year": $(`#machine-year-elem-${id}`).html(),
            "category": {
                "id": Number($(`#machine-id-elem-${id}`).attr('data-category-id'))
            }
        });
    } else {
        return ({
            "name": MACHINE_FORM_ENTRIES.name.val(),
            "description": MACHINE_FORM_ENTRIES.description.val(),
            "brand": MACHINE_FORM_ENTRIES.brand.val(),
            "year": MACHINE_FORM_ENTRIES.year.val(),
            "category": { "id": Number(MACHINE_FORM_ENTRIES.category_id.val()) }
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