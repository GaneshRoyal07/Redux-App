import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getUsers = () => axios.get(`${API}/users`);

export const addUser = (user) => axios.post(`${API}/users`, user);

export const updateUser = (id, user) =>
  axios.put(`${API}/users/${id}`, user);

export const deleteUser = (id) =>
  axios.delete(`${API}/users/${id}`);