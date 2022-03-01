//TODO: modify this to match with the actual login api in the server
import axios from "axios";

export async function signup(credential) {
    return await axios({
        method: "post",
        url: "/api/account/signup",
        data: credential,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
        //handle success
        return response.data.success === true ? response.data.data : null;
    }).catch(function (response) {
        //handle error
        return null;
    });
}