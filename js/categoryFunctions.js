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
    SUBMIT_BUTTON.on('click', function () {
        let data = {
            "name": NAME_ENTRY.val(),
            "description": DESCRIPTION_ENTRY.val(),
        }
        let status = postCategory(data);
        console.log(status);
    });
    // DOM add event listener for any and all elements with the corresponding criteria    

});

// GET
// GET:ALL
export function getCategoryAll() {
    return ajaxFunctions.getAll(URL_ENDPOINT_CATEGORY);
}
// GET:ONE
export function getCategoryOne(categoryID) {
    return ajaxFunctions.getOne(URL_ENDPOINT_CATEGORY, categoryID);
}
// POST
function postCategory(data) {
    //console.log(data);    
    let ajaxResponse = ajaxFunctions.postObject(URL_ENDPOINT_CATEGORY, data);
    cleanFormEntries(...CATEGORY_PROPERTIES_IDENTIFIERS);
    loadAndDrawCategoryTable();
    return ajaxResponse;
}
// PUT
function putCategory(categoryID) {
    let name = $(`#category-name-elem-${categoryID}`).html();
    let description = $(`#category-description-elem-${categoryID}`).html();
    const data = {
        "id": Number(categoryID),
        "name": name,
        "description": description,
    }
    let response = ajaxFunctions.putObject(URL_ENDPOINT_CATEGORY, data);
    console.log(response);
    //loadAndDrawCategoryTable();
    //loadAndDrawCategoryTable();
}
// DELETE
// DELETE:ALL
export function deleteCategoryAll() {
    ajaxFunctions.deleteAll(URL_ENDPOINT_CATEGORY);
}
// DELETE:ONE
export function deleteCategoryOne(categoryID) {
    ajaxFunctions.deleteOne(URL_ENDPOINT_CATEGORY, categoryID);
    loadAndDrawCategoryTable();
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