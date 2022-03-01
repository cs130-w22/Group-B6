import axios from "axios";

export async function trackedAddresses(data) {
    return await axios({
        method: "post",
        url: "/api/user/trackedAddresses",
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