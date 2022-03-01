import axios from "axios";

export async function report(data) {
    return await axios({
        method: "post",
        url: "/api/address/report",
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