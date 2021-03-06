import axios from "axios";

export async function trackedAddresses() {
    return await axios({
        method: "get",
        url: "http://52.40.170.79:5000/address_list",
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