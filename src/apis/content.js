import axios from "axios";

// const url = process.env.REACT_APP_CONTENT_BASE_URL;
const url = "http://www.mocky.io/v2";

export default axios.create({
  baseURL: url
});
