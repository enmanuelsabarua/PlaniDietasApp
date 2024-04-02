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

const getUser = async id => {
    const res = await axios.get(`${baseUrl}/users/${id}`);
    return res.data;
}

const update = async (id, data) => {
    const res = await axios.put(`${baseUrl}/users/${id}`, data);
    return res.data;
}


export default { login, signup, getUser, update }