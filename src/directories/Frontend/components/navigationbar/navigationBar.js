import React, { useRef, useState} from "react";
import { useLocation, useNavigate } from "react-router";
import { Button, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./languageSelector";
import PreviousPage from "./previousPage";
import NextPage from "./nextPage";
import useAuth from "../../hooks/useAuth";

function NavigationBar() {

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
	const [t, i18n] = useTranslation("main");
    const navigate = useNavigate();
    const location = useLocation();

    const { username, isManager, isAdmin } = useAuth();

    const handleClick = () => {
        try {
            if(location.pathname === '/dash/catalog' || location.pathname === '/dash/history') {
                navigate('/', {replace: true});
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

    const ManagementPanel = () => {
        if((username && isManager) || (username && isAdmin)) {
            return (
                <>
                <li>
                    <a className="nav-link dropdown-toggle" href="/settings" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Settings
                    </a>
                    <ul>
                        <li>
                            <Button>New User</Button>
                        </li>
                        <li>
                            <Button>Edit User</Button>
                        </li>
                    </ul>
                </li>
                </>
            )
        }
    };

    return (
    <div style={{padding: "2px" }}>
        {/* <nav className="navbar navbar-expand-lg bg-light"> */}
        <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            {location.pathname !== '/login'? 
                    <a className="navbar-brand"><PreviousPage/></a>
            : null}
            {/* <a className="navbar-brand"><PreviousPage/></a> */}
            {/* <a className="navbar-brand" href="#">NavigationBar</a> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/" onClick={handleClick}>{t('navbar.text.home')}</a>
                </li>
                {ManagementPanel}
                <NavDropdown title={t('navbar.text.settings')} id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#">{t('navbar.text.action')}</NavDropdown.Item>
                    <NavDropdown.Item href="#">
                        {t('navbar.text.anotherAction')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">
                    {t('navbar.text.someElse')}
                    </NavDropdown.Item>
                </NavDropdown>
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder={t('navbar.text.search')} aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">{t('navbar.text.search')}</button>
            </form>
            </div>
            <div style={{paddingLeft: "5px", paddingRight: "5px", paddingBottom: "7.5px"}}>
                <LanguageSelector className= "d-flex lg btn btn-outline-success form-control me-2"/>
            </div>
            {location.pathname === '/dash/catalog' || location.pathname === '/minicard'? 
                    <a className="navbar-brand"><NextPage/></a>
            : null}
        </div>
        </nav>
    </div>
    );
}

export default NavigationBar;
