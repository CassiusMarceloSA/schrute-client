import axios from "axios";

const request = axios.create({
  baseURL: "/api",
});

export function setToken(token: string) {
  request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default request;
