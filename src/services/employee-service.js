import config from "../config/config";
const axios = require('axios').default;

export default class EmployeeService {
  baseUrl = config.baseUrl;
  addUrl = config.addEmployeeUrl;
  
  addEmployee(data) {
    return axios.post(`${this.baseUrl}add`, data);
  }
  updateEmployee(id,data) {
    return axios.put(`${this.baseUrl}update/${id}`, data);
  }
  getAllEmployee() {
    return axios.get(`${this.baseUrl}list`);
  }
  getEmployee(id) {
    return axios.get(`${this.baseUrl}get/${id}`);
  }
  deleteEmployee(id) {
    return axios.delete(`${this.baseUrl}delete/${id}`);
  }
}