import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux libraries
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Language localization files
import { I18nextProvider } from 'react-i18next';
import i18next from "i18next";
import en_US from "./localization/en_US.json";
import fi_FI from "./localization/fi_FI.json";

// Custom components
import HistoryWrapper from './directories/Frontend/components/history/historyWrapper';

// Disable dev tools in production
if (process.env.NODE_ENV === 'production') disableReactDevTools();

// Initialize language localization features
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
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path="history" element={<HistoryWrapper key={`app-history`} />}></Route>
            {/*Setting the path to * will act as a catch-all for any undefined URLs. This is great for a 404 error page.
            Source: https://www.w3schools.com/react/react_router.asp */}
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
