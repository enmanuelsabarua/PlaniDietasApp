import axios from 'axios';
const baseUrl = 'http://localhost:3001/api';

const login = async credentials => {
    const res = await axios.post(`${baseUrl}/login`, credentials);
    return res.data;
}

const signup = async credentials => {
    const res = await axios.post(`${baseUrl}/users`, credentials);
    return res.data;
}

export default { login, signup }