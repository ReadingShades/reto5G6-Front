// Endpoint: /api/Category/
import { URL_BASE } from './config.js';
import * as ajaxFunctions from './baseAjax.js';

export const URL_ENDPOINT_CATEGORY = `${URL_BASE}/api/Category`;
const NAME_ENTRY = $('#category-name');
const DESCRIPTION_ENTRY = $('#category-description');
//const CATEGORY_PROPERTIES_IDENTIFIERS = ['#category-name', '#category-description'];
const CATEGORY_PROPERTIES_IDENTIFIERS = [NAME_ENTRY, DESCRIPTION_ENTRY];
const SUBMIT_BUTTON = $('#submit-button-create');

// Preparation on load page
$(function () {
    window.onload = loadAndDrawCategoryTable();
    SUBMIT_BUTTON.on('click', async function () {
        let selectorData = getDataFields();
        if (checkEditDataFields(selectorData)) {
            let status = await postCategory(selectorData);
            console.log(status);
        }
    });
});

// GET
// GET:ALL
export async function getCategoryAll() {
    return await ajaxFunctions.getAll(URL_ENDPOINT_CATEGORY)
        .then(response => {
            //console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
}
// GET:ONE
export async function getCategoryOne(categoryID) {
    return await ajaxFunctions.getOne(URL_ENDPOINT_CATEGORY, categoryID)
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
 * @param {Object} data - a JSON object containing the data to be sent to the server to create a new category
 * @param {string} data.id - the ID of the new category, null for new categories
 * @param {string} data.name - the name of the new category
 * @param {string} data.description - the description of the new category
 * @returns {object} - a JSON/AJAX response object containing the operation results
 */
async function postCategory(data) {
    //console.log(data);    
    let ajaxResponse = await ajaxFunctions.postObject(URL_ENDPOINT_CATEGORY, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    cleanFormEntries(...CATEGORY_PROPERTIES_IDENTIFIERS);
    loadAndDrawCategoryTable();
    return ajaxResponse;
}
// PUT
async function putCategory(categoryID) {
    let name = $(`#category-name-elem-${categoryID}`).html();
    let description = $(`#category-description-elem-${categoryID}`).html();
    const data = {
        "id": Number(categoryID),
        "name": name,
        "description": description,
    }
    let response = await ajaxFunctions.putObject(URL_ENDPOINT_CATEGORY, data)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawCategoryTable();
    return response;
}
// DELETE
// DELETE:ALL
export async function deleteCategoryAll() {
    await ajaxFunctions.deleteAll(URL_ENDPOINT_CATEGORY)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawCategoryTable();
}
// DELETE:ONE
export async function deleteCategoryOne(categoryID) {
    await ajaxFunctions.deleteOne(URL_ENDPOINT_CATEGORY, categoryID)
        .then(response => {
            console.log(response);
            return response;
        }).catch(e => {
            console.log(e);
        });
    loadAndDrawCategoryTable();
}

// Utilities
function cleanFormEntries(...args) {
    args.forEach(elem => {
        elem.val('');
    });
}

async function loadAndDrawCategoryTable() {
    let json_categories = await getCategoryAll();
    //console.log(json_categories);
    drawCategoryTable(json_categories);
}

function drawCategoryTable(json_categories) {
    //console.log(json_categories);
    let myTable = "<table class = 'table-auto min-w-full bg-purple-100'>";
    myTable += "<thead class = 'bg-white border-b'>";
    myTable += "<tr>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-left'>id</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>name</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>description</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>machines</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>DATA</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center'>EDIT</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-center '>DELETE</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0; i < json_categories.length; i++) {
        let idCategory = json_categories[i].id;
        myTable += "<tr class='border-b bg-gray-800 border-gray-900'>";
        myTable += `<td id='category-id-elem-${idCategory}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap'>${idCategory}</td>`;
        myTable += `<td id='category-name-elem-${idCategory}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap' contenteditable='true'>${json_categories[i].name}</td>`;
        myTable += `<td id='category-description-elem-${idCategory}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap' contenteditable='true'>${json_categories[i].description}</td>`;
        myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center'>${json_categories[i].machines.length}</td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='show-data-${idCategory}' data-machines='${JSON.stringify(json_categories[i].machines)}' class='bg-blue-600 px-6 py-4 rounded focus:outline-none hover:border-blue-200'>SHOW</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='edit-data-${idCategory}' class='bg-green-600 px-6 py-4 rounded focus:outline-none hover:border-green-200'>EDIT</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='delete-data-${idCategory}' class='bg-red-800 px-6 py-4 rounded focus:outline-none hover:border-red-200'>DELETE</button></td>`;

        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tableCategories").html(myTable);
    loadTableTriggers(json_categories);
}

function showMachineData(categoryName, json_machines) {
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
    //console.log(json_machines);
    let myTable = `<h1 class='title-font font-medium text-3xl text-gray-900 justify-center text-center'> Lista de maquinas (${categoryName}) </h1><br>`
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
    for (let i = 0; i < json_machines.length; i++) {
        let idMachine = json_machines[i].id;
        myTable += "<tr class='border-b bg-gray-800 border-gray-900'>";
        myTable += `<td id='category-id-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center'>${idMachine}</td>`;
        myTable += `<td id='category-name-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' >${json_machines[i].name}</td>`;
        myTable += `<td id='category-description-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' >${json_machines[i].brand}</td>`;
        myTable += `<td id='category-description-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' >${json_machines[i].year}</td>`;
        myTable += `<td id='category-description-elem-${idMachine}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap text-center' >${json_machines[i].description}</td>`;
        myTable += "</tr>";
    }
    myTable += "</table>";
    machineTable.html(myTable);
    $("#machine-data-section").show();
};

function loadTableTriggers(json_categories) {
    for (let i = 0; i < json_categories.length; i++) {
        let idCategory = json_categories[i].id;
        $(`#show-data-${idCategory}`).on('click', function () {
            let json_machines = $(`#show-data-${idCategory}`).attr('data-machines');
            showMachineData(json_categories[i].name, json_machines);
        });
        $(`#edit-data-${idCategory}`).on('click', function () {
            let selectorData = getDataFields(idCategory);
            if (checkEditDataFields(selectorData)) putCategory(idCategory);
        });
        $(`#delete-data-${idCategory}`).one('click', function () {
            deleteCategoryOne(idCategory);
        });
    }
}

function getDataFields(id = null) {
    if (id) {
        return ({
            "name": $(`#category-name-elem-${id}`).text(),
            "description": $(`#category-description-elem-${id}`).text(),
        });
    } else {
        return ({
            "name": CATEGORY_PROPERTIES_IDENTIFIERS[0].val(),
            "description": CATEGORY_PROPERTIES_IDENTIFIERS[1].val(),
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
