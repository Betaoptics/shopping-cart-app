
import { useState, useRef } from "react";
import { Form, Button, Col, Row, Spinner, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Notification from "../Notification";
import FacebookLogin from 'react-facebook-login';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

let salt = "";

function Login() {

    const [t] = useTranslation("main");
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const navigate = useNavigate();

    const onSubmit = async (params) => {
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        salt = hashPassword;
        // console.log("salt: ", salt);
        const doesPasswordMatch = bcrypt.compareSync(password, hashPassword);
        // console.log("Maches? ", doesPasswordMatch);
        // console.log("hashPassword", hashPassword);

        const hashedPassword = bcrypt.hashSync(password, hashPassword); // hash created previously created upon sign up

        if(doesPasswordMatch === true ) {
            navigate('/frontpage', {replace: true});
        }
    
        const PORT = 3000;
        const url1 = `https://localhost:${PORT}`
        const url2 = 'https://api.sampleapis.com/beers/ale';
        // console.log("url1:", url1 + "\n");
        // console.log("\n");
        // console.log("url1:", url2 + "\n");
        // console.log("\n");

        fetch(url1, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: hashedPassword,
          }),
        })
    }

    return (
        <div className='App'>
            <header className='App-header'>
            <form>
                {/* <input 
                style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} 
                ref={emailInputRef} type='email' placeholder={t('login.text.email')} />
                <input 
                style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} 
                ref={passwordInputRef} type='password' placeholder={t('login.text.password')} /> */}
                <Row className="mb-3">
                <Col>
                    <InputGroup>
                        <Form.Control
                        size="lg"
                        placeholder={t('login.text.email')}
                        aria-label="E-Mail"
                        aria-describedby="basic-addon1"
                        type='email'
                        ref={emailInputRef}
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup>
                        <Form.Control
                        size="lg"
                        placeholder={t('login.text.password')}
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        type='password'
                        ref={emailInputRef}
                        />
                    </InputGroup>
                </Col>
                <Col>
                <InputGroup>
                    <Button
                        size="lg"
                        type='submit'
                        // style={{ padding: '25px', borderRadius: '10px', margin: '10px' }}
                        onClick={e => {
                        e.preventDefault()
                        onSubmit()
                        }}>
                        {t('login.button.login')}
                    </Button>
                    </InputGroup>
                </Col>
                </Row>
            </form>
            <span>{t('login.text.salts')}{salt}</span>
            <br />
            <span>
                {t('login.text.saveSalts')} <br /> {t('login.text.uponRefresh')}
            </span>
            </header>
        </div>
    )
}

export default Login;