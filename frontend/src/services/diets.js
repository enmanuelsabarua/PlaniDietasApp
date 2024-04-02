import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/diets';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
}

const getAll = async () => {
    const req = await axios.get(baseUrl);
    return req.data;
}

const getOne = async id => {
    const req = await axios.get(`${baseUrl}/${id}`);
    return req.data;
}

const getOneByCalories = async id => {
    const req = await axios.get(`${baseUrl}/calorie/${id}`);
    return req.data;
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const req = await axios.post(baseUrl, newObject, config);
    return req.data;
}

const update = async (id, newObject) => {
    const req = await axios.put(`${baseUrl}/${id}`, newObject);
    return req.data;
}

const remove = async id => {
    const req = await axios.delete(`${baseUrl}/${id}`);
    return req.status;
}

export default {
    getAll,
    getOne,
    getOneByCalories,
    create,
    update,
    remove,
    setToken
}