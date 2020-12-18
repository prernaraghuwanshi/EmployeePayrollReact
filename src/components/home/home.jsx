import React from "react";
import addIcon from "../../assets/icons/add-24px.svg";
import "./home.css";
import EmployeeService from "../../services/employee-service";
import Display from "../display/display";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchExpand: false,
      employeeArray: [],
      AllEmployeeArray: [],
    };
    this.employeeService = new EmployeeService();
  }
  // openSearch = () => {
  //   this.setState({ searchExpand: true });
  // };

  componentDidMount() {
    this.getAllEmployee();
  }

  getAllEmployee = () => {
    this.employeeService
      .getAllEmployee()
      .then((data) => {
        console.log("data after get ", data.data);
        this.setState({
          employeeArray: data.data,
          AllEmployeeArray: data.data,
        });
      })
      .catch((err) => {
        console.log("err after ", err);
      });
  };

  render() {
    return (
      <div>
        <header className="header-content header">
          <div className="logo-content">
            <img src={logo} alt="" />
            <div>
              <span className="emp-text">EMPLOYEE</span> <br />
              <span className="emp-text emp-payroll">PAYROLL</span>
            </div>
          </div>
        </header>
        <div className="main-content">
          <div className="header-content">
            <div className="emp-detail-text">
              Employee Details <div className="emp-count"></div>
            </div>
            <div className="row center button-box">
              <Link to="payroll-form" className="add-button flex-row-center">
                <img src={addIcon} alt="" /> Add User
              </Link>
            </div>
          </div>
          <div className="table-main">
            <Display
              employeeArray={this.state.employeeArray}
              getAllEmployee={this.getAllEmployee}
            />
          </div>
        </div>
      </div>
    );
  }
}
