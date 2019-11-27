import axios from "axios";
let baseUrl = "http://localhost:8001/api";
var api = {
  // get records
  get: function(url) {
    return axios.get(`${baseUrl}${url}`);
  },

  // post records
  post: function(url, data) {
    return axios.post(`${baseUrl}${url}`, data);
  },

  // update records
  put: function(url, data) {
    return axios.put(`${baseUrl}${url}`, data);
  },

  // delete records
  delete: function(url) {
    return axios.delete(`${baseUrl}${url}`);
  }
};

export default api;
