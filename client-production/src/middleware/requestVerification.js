import axios from "axios";
import { API_URL } from "../App";

const requestVerification = async authtoken => {
    try {
        const res = await axios.get(`${API_URL}/auth/verify`, {
            headers: {
                Authorization: authtoken
            }
        })
        return res
    } catch (err) {
        console.log(err);
    }
}