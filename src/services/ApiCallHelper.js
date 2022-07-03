import axios from "axios";

const instance = axios.create({
  baseURL: "https://hyperlocal-backend.herokuapp.com",
});

export default instance;
