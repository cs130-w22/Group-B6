//TODO: modify this to match with the actual login api in the server
import axios from "axios";

export async function analytics(data) {
    return await axios({
        method: "post",
        url: "http://52.40.170.79:5101/analyze",
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