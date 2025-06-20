import axios from "axios";
const baseUrl = "/api/login";

const login = async (loginInfo) => {
  const res = await axios.post(baseUrl, loginInfo);
  return res.data;
};

export default { login };
