import axios from "axios";

//TODO: modify this to match with the actual login api in the server
export async function login(credential) {
    return await axios({
        method: "post",
        url: "http://0.0.0.0:5000/auth/login",
        data: credential,
        headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*' },
    }).then(function (response) {
            //handle success
            return response.data.success === true;
        }).catch(function (response) {
            //handle error
            return false;
        });
}
