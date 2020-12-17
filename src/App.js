import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
}from "react-router-dom";
import PayrollForm from './components/payroll-form/payroll-form';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="">
            <PayrollForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
