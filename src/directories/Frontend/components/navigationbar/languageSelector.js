import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from 'react-bootstrap';
import finFlag from '../../../../images/finland.png';
import engFlag from '../../../../images/united-kingdom.png';

function LanguageSelector() {
	const [t, i18n] = useTranslation("main");

    return (
    <div>
         <Form.Control as="select" className="mt-2 border border-primary" size="m"
          defaultValue={localStorage.getItem("localization") || "en_US"}
          onChange={ (e) => {
              localStorage.setItem("localization", e.target.value);
              i18n.changeLanguage(e.target.value);
          }}>
          {/*Replace with images*/}
          <option value="fi_FI">Suomi</option>
          <option value="en_US">English</option>
          {/* <option value="fi_FI"><img src={finFlag} alt="FinnishFlag"></img></option>
          <option value="en_US"><img src={engFlag} alt="EnglishFlag"></img></option> */}
      </Form.Control>
    </div>
    );
}

export default LanguageSelector;
