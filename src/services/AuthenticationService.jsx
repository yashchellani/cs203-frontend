import axios from "axios";

const REGISTER_API_URL = "http://localhost:8080/register"
const AUTH_API_URL = "http://localhost:8080/users/search"

class AuthenticationService {
    registerUser = (user) => {
        return axios.post(REGISTER_API_URL, user);
    };

    authenticate = (user) => {
        return axios
            .get(AUTH_API_URL, user)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                console.log(localStorage.getItem("user"));
                // return response.data;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    };

    signOut() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthenticationService();
