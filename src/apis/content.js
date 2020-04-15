import axios from "axios";

const url = process.env.REACT_APP_CONTENT_BASE_URL;

export default axios.create({
  baseURL: url
});
