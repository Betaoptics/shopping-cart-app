import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

//import language localization files
import en_US from "./Utilities/Localization/en_US.json";
import fi_FI from "./Utilities/Localization/fi_FI.json";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import i18next from "i18next";
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './Redux/store/store';
import Frontpage from './Components/Frontpage';
import Login from './Components/Forms/Login';
import FetchData from './Components/FetchData/FetchData';
import MainFormView from './Components/Forms/ItemListForm/MainFormView';
import Navigation from './Utilities/Controllers/Navigation';

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("localization") || "en_US",
  resources: {
    en_US: {
      main: en_US
    },
    fi_FI: {
      main: fi_FI
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigation/>}></Route>
            <Route path="login" index element={<Login/>}></Route>
            <Route path="app" element={<App/>}></Route>
            <Route path="frontpage" element={<Frontpage/>}></Route>
            {/*Setting the path to * will act as a catch-all for any undefined URLs. This is great for a 404 error page.
            Source: https://www.w3schools.com/react/react_router.asp */}
          </Routes>
          <App />
          <Login/>
          <FetchData/>
          <MainFormView/>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
