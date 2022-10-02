// Base ajax functions
// GET
// GET:ALL
export async function getAll(URL_ENDPOINT) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: `${URL_ENDPOINT}/all`,
            type: "GET",
            dataType: "JSON",
            success: (response) => {
                resolve(response);
            },
            error: (response) => {
                reject(response);
            }
        });
    });
}
// GET:ONE
export async function getOne(URL_ENDPOINT, elementID) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${URL_ENDPOINT}/${Number(elementID)}`,
            type: "GET",
            dataType: "JSON",
            success: (response) => {
                resolve(response);
            },
            error: (response) => {
                reject(response);
            }
        });
    });
}
// POST
export async function postObject(URL_ENDPOINT, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: `${URL_ENDPOINT}/save`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "application/json",
            data: JSON.stringify(data),
            success: (response) => {
                resolve(response);
            },
            error: (response) => {
                reject(response);
            }
        });
    });

}
// PUT
export async function putObject(URL_ENDPOINT, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${URL_ENDPOINT}/update`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PUT",
            dataType: "application/json",
            data: JSON.stringify(data),
            success: (response) => {
                resolve(response);
            },
            error: (response) => {
                reject(response);
            }
        });
    });
}
// DELETE
// DELETE:ALL
export async function deleteAll(URL_ENDPOINT) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${URL_ENDPOINT}/all}`,
            type: "DELETE",
            dataType: "JSON",
            success: (response) => {
                resolve(response);
            },
            error: (response) => {
                reject(response);
            }
        });
    });
}
// DELETE:ONE
export async function deleteOne(URL_ENDPOINT, elementID) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: `${URL_ENDPOINT}/${Number(elementID)}`,
            type: "DELETE",
            dataType: "JSON",
            success: (response) => {
                resolve(response);
            },
            error: (response) => {
                reject(response);
            }
        });
    });
}