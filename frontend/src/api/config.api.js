import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Get config by key (hero, about, projects)
export const fetchConfig = async (key) => {
  const res = await API.get(`/config/${key}`);
  return res.data;
};
