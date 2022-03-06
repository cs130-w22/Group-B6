//TODO: modify this to match with the actual login api in the server
import axios from "axios";

export async function track(data) {
    return await axios({
        method: "post",
        url: "http://localhost:5000/create_track",
        data: data,
        headers: { 'Access-Control-Allow-Origin' : '*', "Content-Type": "application/json" },
    }).then(function (response) {
        //handle success
        return response.data.success === true;
    }).catch(function (response) {
        //handle error
        return false;
    });
}

export async function query(data) {
    return await axios({
        method: "post",
        url: "http://localhost:5101/zapper",
        data: data,
        headers: { 'Access-Control-Allow-Origin': '*', "Content-Type": "multipart/form-data" },
    }).then(function (response) {
        //handle success
        return response.data.success === true ? response.data.data : null;
    }).catch(function (response) {
        //handle error
        return null;
    });
}