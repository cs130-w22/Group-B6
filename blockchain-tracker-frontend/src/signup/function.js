//TODO: modify this to match with the actual login api in the server
import axios from "axios";

export async function signup(credential) {
    return await axios({
        method: "post",
        url: "http://52.40.170.79:5000/auth/register",
        data: credential,
        headers: { 'Access-Control-Allow-Origin' : '*', "Content-Type": "application/json" },
    }).then(function (response) {
        //handle success
        return response.data.success === true;
    }).catch(function (response) {
        //handle error
        return false;
    });
}