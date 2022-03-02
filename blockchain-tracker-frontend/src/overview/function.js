import axios from "axios";

export async function trackedAddresses() {
    return await axios({
        method: "get",
        url: "http://0.0.0.0:5000/get_address",
        data: null,
        headers: { 'Access-Control-Allow-Origin' : '*', "Content-Type": "application/json" },
    }).then(function (response) {
        //handle success
        return response.data.success === true ? response.data.address : [];
    }).catch(function (response) {
        //handle error
        return [];
    });
}