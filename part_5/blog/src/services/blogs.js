import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const update = async (blogId, update, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const res = await axios.put(`${baseUrl}/${blogId}`, update, config);
  return res.data;
};

const remove = async (blogId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const res = await axios.delete(`${baseUrl}/${blogId}`, config);
  return res.data;
};

export default { getAll, create, update, remove };
