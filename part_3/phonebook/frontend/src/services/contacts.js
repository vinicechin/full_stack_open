import axios from "axios";

const baseUrl = "/api/persons";

function getAll() {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
}

function create(newContact) {
  const req = axios.post(baseUrl, newContact);
  return req.then((res) => res.data);
}

function remove(id) {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
}

function update(id, newContact) {
  const req = axios.put(`${baseUrl}/${id}`, newContact);
  return req.then((res) => res.data);
}

export default {
  getAll,
  create,
  remove,
  update,
};
