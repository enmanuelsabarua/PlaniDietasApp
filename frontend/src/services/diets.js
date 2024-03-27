import axios from 'axios';
const baseUrl = 'http://localhost:3001/diets';

const getAll = async () => {
    const req = await axios.get(baseUrl);
    return req.data;
}

const create = async newObject => {
    const req = await axios.post(baseUrl, newObject);
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
    create,
    update,
    remove
}