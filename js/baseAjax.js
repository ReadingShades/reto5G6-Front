// Base ajax functions
// GET
// GET:ALL
export function getAll(URL_ENDPOINT) {
    return $.ajax({
        url: `${URL_ENDPOINT}/all`,
        type: "GET",
        dataType: "JSON",
        success: function (response) {
            //console.log(response);
            return response;
        }
    });
}
// GET:ONE
export function getOne(URL_ENDPOINT, elementID) {
    return $.ajax({
        url: `${URL_ENDPOINT}/${Number(elementID)}`,
        type: "GET",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            return response;
        }
    });
}
// POST
export function postObject(URL_ENDPOINT, data) {
    //console.log(data);
    let ajaxResponse;
    if (data.name.length > 0 && data.description.length > 0) {
        ajaxResponse = $.ajax({
            url: `${URL_ENDPOINT}/save`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                console.log(data);
                return (data);
            }
        })
    }
    return ajaxResponse;
}
// PUT
export function putObject(URL_ENDPOINT, data) {
    //console.log(data);
    let ajaxResponse;
    if (data.name.length > 0 && data.description.length > 0) {
        ajaxResponse = $.ajax({
            url: `${URL_ENDPOINT}/update`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PUT",
            dataType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                console.log(data);
                return (data);
            }
        })
    }
    return ajaxResponse;
}
// DELETE
// DELETE:ALL
export function deleteAll(URL_ENDPOINT) {
    return $.ajax({
        url: `${URL_ENDPOINT}/all}`,
        type: "DELETE",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
        }
    });
}
// DELETE:ONE
export function deleteOne(URL_ENDPOINT, elementID) {
    return $.ajax({
        url: `${URL_ENDPOINT}/${Number(elementID)}`,
        type: "DELETE",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
        }
    });
}