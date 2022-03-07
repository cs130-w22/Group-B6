import axios from "axios";

axios.defaults.withCredentials = true

export async function login(credential) {
    return await axios({
        method: "post",
        url: "https://cors-everywhere.herokuapp.com/http://52.40.170.79:5000/auth/login",
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
