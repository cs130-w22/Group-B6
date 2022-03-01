//TODO: modify this to match with the actual login api in the server
import axios from "axios";

export async function track(data) {
    return await axios({
        method: "post",
        url: "/api/address/track",
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

export async function query(data) {
    return await axios({
        method: "post",
        url: "http://44.203.39.37:5101/zapper",
        data: data,
        headers: { "Content-Type": "application/json" },
    }).then(function (response) {
        //handle success
        return response.data.success === true ? response.data.data : null;
    }).catch(function (response) {
        //handle error
        return null;
    });
}