import axios from "axios";

export async function validate(data) {
    return await axios({
        method: "post",
        url: "/api/address/validate",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
        //handle success
        return response.data.success === true ? response.data.data : null;
    }).catch(function (response) {
        //handle error
        return null;
    });
}

export async function logout() {
    return await axios({
        method: "get",
        url: "https://cors-everywhere.herokuapp.com/http://52.40.170.79:5000/auth/logout",
        data: null,
        headers: {'Access-Control-Allow-Origin' : '*'}
    }).then(function (response) {
        //handle success
        return response.data.success === true;
    }).catch(function (response) {
        //handle error
        return false;
    });
}