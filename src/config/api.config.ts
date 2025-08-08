import axios from "axios";

const api = axios.create({
  baseURL: "https://linked-posts.routemisr.com",
});
export default api;
