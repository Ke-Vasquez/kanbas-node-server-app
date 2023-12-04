import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;

export const signin = async (credentials) => {
  const response = await axios.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

export const updateUser = async (user) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
