import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Col, Row, Card, Button, Stack, Form, } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'

function PreviousPage() {
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
	const [t, i18n] = useTranslation("main");
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        // Might consider switch case instead.
        try {
            if(location.pathname === '/dash/history') {
                navigate('/dash/catalog', {replace: true});
            } else if(location.pathname === '/dash/catalog' || location.pathname === '/catalog') {
                navigate('/login', {replace: true});
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
    }

    return (
    <div>
        <Row>
            <Col>
                <Stack direction="horizontal" gap={2}>
                    <Button variant="light" onClick={handleClick}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                    </Button>
                </Stack>
            </Col>
        </Row>
    </div>
    );
}

export default PreviousPage;
