import React, { useState, useEffect } from "react";
import profile1 from "../../assets/profile-images/Ellipse -1.png";
import profile2 from "../../assets/profile-images/Ellipse -2.png";
import profile3 from "../../assets/profile-images/Ellipse -3.png";
import profile4 from "../../assets/profile-images/Ellipse -4.png";
import "./payroll-form.css";
import logo from "../../assets/images/logo.png";
import { useParams, Link, withRouter } from "react-router-dom";
import EmployeeService from "../../services/employee-service";

const PayrollForm = (props) => {
  let initialValue = {
    name: "",
    profileArray: [
      { url: "../../assets/profile-images/Ellipse -1.png" },
      { url: "../../assets/profile-images/Ellipse -2.png" },
      { url: "../../assets/profile-images/Ellipse -3.png" },
      { url: "../../assets/profile-images/Ellipse -4.png" },
    ],
    // allDepartment: ["HR", "Sales", "Finance", "Engineer", "Others"],
    departmentValue: "",
    gender: "",
    salary: "",
    day: "01",
    month: "01",
    year: "2020",
    startDate: "",
    notes: "",
    id: "",
    imagePath: "",
    isUpdate: false,
    error: {
      department: "",
      name: "",
      gender: "",
      salary: "",
      profileUrl: "",
      startDate: "",
    },
  };
  const [formValue, setForm] = useState(initialValue);
  const employeeService = new EmployeeService();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getDataById(params.id);
    }
  }, []);

  const getDataById = (id) => {
    employeeService
      .getEmployee(id)
      .then((res) => {
        console.log("data is ", res.data);
        let obj = res.data;
        setData(obj);
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  };

  const setData = (obj) => {
    setForm({
      ...formValue,
      ...obj,
      isUpdate: true,
    });
    console.log(obj);
  };

  const changeValue = (event) => {
    setForm({ ...formValue, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };


  const save = async (event) => {
    event.preventDefault();
    let object = {
      name: formValue.name,
      department: formValue.departmentValue,
      gender: formValue.gender,
      salary: formValue.salary,
      startDate: `${formValue.year}-${formValue.month}-${
        formValue.day
      }`,
      notes: formValue.notes,
      id: formValue.id,
      imagePath: formValue.imagePath,
    };
    
    if (formValue.isUpdate) {
        // console.log(params.id);
      employeeService
        .updateEmployee(params.id,object)
        .then((res) => {
          console.log("data after update", res);
          alert(res.data.message);
          props.history.push("");
        })
        .catch((err) => {
          console.log("Error in update");
        });
    } else {
      employeeService
        .addEmployee(object)
        .then((res) => {
          console.log("data added");
          alert(res.data.message);
          props.history.push("");
        })
        .catch((err) => {
          console.log("err while Add");
        });
    }
  };

  const reset = () => {
    setForm({
      ...initialValue,
      id: formValue.id,
      isUpdate: formValue.isUpdate,
    });

    console.log(formValue);
  };
  return (
    <div className="payroll-main">
      <header className="header-content header">
        <div className="logo">
          <img src={logo} alt="" />
          <div>
            <span className="emp-text">EMPLOYEE</span> <br />
            <span className="emp-text emp-payroll">PAYROLL</span>
          </div>
        </div>
      </header>
      <div className="form-content">
        <form className="form" action="#" onSubmit={save}>
          <div className="form-head">Employee Payroll form</div>
          <div className="row-content">
            <label className="label text" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              value={formValue.name}
              onChange={changeValue}
              placeholder="Your name.."
            />
          </div>
          <div className="error"> {formValue.error.name} </div>
          <div className="row-content">
            <label className="label text" htmlFor="profileUrl">
              Profile image
            </label>
            <div className="profile-radio-button">
              <label>
                <input
                  type="radio"
                  name="imagePath"
                  checked={
                    formValue.imagePath ===
                    "../../assets/profile-images/Ellipse -1.png"
                  }
                  value="../../assets/profile-images/Ellipse -1.png"
                  onChange={changeValue}
                />
                <img className="profile" src={profile1} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="imagePath"
                  checked={
                    formValue.imagePath ===
                    "../../assets/profile-images/Ellipse -2.png"
                  }
                  value="../../assets/profile-images/Ellipse -2.png"
                  onChange={changeValue}
                />
                <img className="profile" src={profile2} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="imagePath"
                  checked={
                    formValue.imagePath ===
                    "../../assets/profile-images/Ellipse -3.png"
                  }
                  value="../../assets/profile-images/Ellipse -3.png"
                  onChange={changeValue}
                />
                <img className="profile" src={profile3} alt="profile" />
              </label>
              <label>
                <input
                  type="radio"
                  name="imagePath"
                  checked={
                    formValue.imagePath ===
                    "../../assets/profile-images/Ellipse -4.png"
                  }
                  value="../../assets/profile-images/Ellipse -4.png"
                  onChange={changeValue}
                />
                <img className="profile" src={profile4} alt="profile" />
              </label>
            </div>
          </div>
          <div className="error"> {formValue.error.imagePath} </div>
          <div className="row-content">
            <label className="label text" htmlFor="gender">
              Gender
            </label>
            <div>
              <input
                type="radio"
                id="male"
                checked={formValue.gender === "male"}
                onChange={changeValue}
                name="gender"
                value="male"
              />
              <label className="text" htmlFor="male">
                Male
              </label>
              <input
                type="radio"
                id="female"
                checked={formValue.gender === "female"}
                onChange={changeValue}
                name="gender"
                value="female"
              />
              <label className="text" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          <div className="error"> {formValue.error.gender} </div>

          <div className="row-content">
            <label className="label text" htmlFor="department">
              Department
            </label>
            <div>
              <input
                className="radio"
                type="radio"
                id="Sales"
                onChange={changeValue}
                name="departmentValue"
                checked={formValue.departmentValue === "Sales"}
                value="Sales"
              />
              <label className="text" htmlFor="Sales">
                Sales
              </label>
              <input
                className="radio"
                type="radio"
                id="Finance"
                onChange={changeValue}
                name="departmentValue"
                checked={formValue.departmentValue === "Finance"}
                value="Finance"
              />
              <label className="text" htmlFor="Finance">
                Finance
              </label>
              <input
                className="radio"
                type="radio"
                id="Engineer"
                onChange={changeValue}
                name="departmentValue"
                checked={formValue.departmentValue === "Engineer"}
                value="Engineer"
              />
              <label className="text" htmlFor="Engineer">
                Engineer
              </label>
              <input
                className="radio"
                type="radio"
                id="HR"
                onChange={changeValue}
                name="departmentValue"
                checked={formValue.departmentValue === "HR"}
                value="HR"
              />
              <label className="text" htmlFor="HR">
                HR
              </label>
            </div>
          </div>
          <div className="error"> {formValue.error.department} </div>

          <div className="row-content">
            <label className="label text" htmlFor="salary">
              Salary
            </label>
            <input
              className="input"
              type="number"
              onChange={changeValue}
              id="salary"
              value={formValue.salary}
              name="salary"
              placeholder="Salary"
            />
          </div>
          <div className="error"> {formValue.error.salary} </div>

          <div className="row-content">
            <label className="label text" htmlFor="startDate">
              Start Date
            </label>
            <div>
              <select
                value={formValue.day}
                onChange={changeValue}
                id="day"
                name="day"
              >
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select
                value={formValue.month}
                onChange={changeValue}
                id="month"
                name="month"
              >
                <option value="01">January</option>
                <option value="02">Febuary</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select
                value={formValue.year}
                onChange={changeValue}
                id="year"
                name="year"
              >
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
              </select>
            </div>
          </div>
          <div className="error"> {formValue.error.startDate} </div>

          <div className="row-content">
            <label className="label text" htmlFor="notes">
              Notes
            </label>
            <textarea
              onChange={changeValue}
              id="notes"
              value={formValue.notes}
              className="input"
              name="notes"
              placeholder=""
              style={{ height: "100%" }}
            ></textarea>
          </div>

          <div className="buttonParent">
            <Link to="" className="resetButton button cancelButton">
              Cancel
            </Link>

            <div className="submit-reset">
              <button
                type="submit"
                className="button submitButton"
                id="submitButton"
              >
                {formValue.isUpdate ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="resetButton button"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default withRouter(PayrollForm);
