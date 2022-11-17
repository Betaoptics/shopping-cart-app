// import logo from './logo.svg';
import './App.css';
import Login from './Components/Forms/Login';
import FetchData from './Components/FetchData/FetchData';
import MainFormView from './Components/Forms/ItemListForm/MainFormView';
import { useTranslation } from "react-i18next";
import { Form } from 'react-bootstrap';

function App() {

  const [t, i18n] = useTranslation("main");

  return (
    <div className="App" style={{padding: "10px", margin: "10px"}}>
      <Form.Control as="select" className="mt-2 border border-primary" size="sm"
          defaultValue={localStorage.getItem("localization") || "en_US"}
          onChange={ (e) => {
              localStorage.setItem("localization", e.target.value);
              i18n.changeLanguage(e.target.value);
          }}>
          <option value="fi_FI">Suomi</option>
          <option value="en_US">English</option>
      </Form.Control>
      {/* <Login/> */}
      {/* <FetchData/> */}
      {/* <MainFormView/> */}
      <p>This is App</p>
    </div>
  );
}

export default App;
