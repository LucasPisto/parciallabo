import axios from "axios";

const { VITE_API_URL: apiUrl } = import.meta.env;

export const login = async (user) => {
   const { data } = await axios.post(`${apiUrl}/auth/login`, user);
   return data;
};
