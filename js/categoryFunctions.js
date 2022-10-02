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
$(document).ready(function () {
    window.onload = loadAndDrawCategoryTable();
    SUBMIT_BUTTON.on('click', async function () {
        let data = {
            //"id": null,
            "name": NAME_ENTRY.val(),
            "description": DESCRIPTION_ENTRY.val(),
        }
        let status = await postCategory(data);
        console.log(status);
    });
    // DOM add event listener for any and all elements with the corresponding criteria    

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
    await ajaxFunctions.deleteAll(URL_ENDPOINT_CATEGORY).then(response => {
        console.log(response);
        return response;
    }).catch(e => {
        console.log(e);
    });
    loadAndDrawCategoryTable();
}
// DELETE:ONE
export async function deleteCategoryOne(categoryID) {
    await ajaxFunctions.deleteOne(URL_ENDPOINT_CATEGORY, categoryID).then(response => {
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
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-left'>name</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-left'>description</th>";
    //myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-left'>machines</th>";    
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-left'>EDIT</th>";
    myTable += "<th scope='col' class='text-sm font-medium text-gray-900 px-6 py-4 text-left '>DELETE</th>";
    myTable += "</tr>    ";
    myTable += "</thead>";
    for (let i = 0; i < json_categories.length; i++) {
        myTable += "<tr class='border-b bg-gray-800 boder-gray-900'>";
        myTable += `<td id='category-id-elem-${json_categories[i].id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap'>${json_categories[i].id}</td>`;
        myTable += `<td id='category-name-elem-${json_categories[i].id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap' contenteditable='true'>${json_categories[i].name}</td>`;
        myTable += `<td id='category-description-elem-${json_categories[i].id}' class='text-sm text-white font-light px-6 py-4 whitespace-nowrap' contenteditable='true'>${json_categories[i].description}</td>`;
        //myTable += `<td class='text-sm text-white font-light px-6 py-4 whitespace-nowrap' contenteditable='true'>${json_categories[i].machines}</td>`;        
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='edit-data-${json_categories[i].id}' class='bg-green-600 px-6 py-4 rounded focus:outline-none hover:border-green-200'>EDIT</button></td>`;
        myTable += `<td class='text-sm text-white font-light whitespace-nowrap'><button id='delete-data-${json_categories[i].id}' class='bg-red-800 px-6 py-4 rounded focus:outline-none hover:border-red-200'>DELETE</button></td>`;

        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tableCategories").html(myTable);
    loadTableTriggers(json_categories);
}

function loadTableTriggers(json_categories) {
    for (let i = 0; i < json_categories.length; i++) {
        $(`#edit-data-${json_categories[i].id}`).one('click', function () {
            putCategory(json_categories[i].id);
        });
        $(`#delete-data-${json_categories[i].id}`).one('click', function () {
            deleteCategoryOne(json_categories[i].id);
        });
    }
}