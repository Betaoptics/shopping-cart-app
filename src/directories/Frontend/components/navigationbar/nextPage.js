import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Col, Row, Button, Stack, } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'

function NextPage() {
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
	const [t, i18n] = useTranslation("main");
    const navigate = useNavigate();
    const location = useLocation();

    // const currentLocale = window.location.href;

    const handleClick = () => {
        try {

            if(location.pathname === '/dash/catalog') {
                navigate('/dash/history', {replace: true});
            }
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
      };

    return (
    <div>
        <Row>
            <Col>
                <Stack direction="horizontal" gap={2}>
                    <Button variant="light" onClick={handleClick}>
                        <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                    </Button>
                </Stack>
            </Col>
        </Row>
    </div>
    );
}

export default NextPage;
