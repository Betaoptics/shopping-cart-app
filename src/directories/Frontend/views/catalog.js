import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/productCard";
import Navigationbar from "../components/navigationbar/navigationBar";
import { Outlet } from 'react-router-dom';
import useTitle from "../hooks/useTitle";

function Catalog() {

    useTitle('Catalog');
	const [t, i18n] = useTranslation("main");

    const key = `1992`;

    return (
    <>
      <Navigationbar key={`Navigation-bar`}/>
        <div className="container-fluid" style={{ height: '100vh',background: '#f2f2f2' }}>
            <Row>
                <Col className="text-center">
                    <h1 className="m-5">{t('frontpage.text.catalog')}</h1>
                </Col>
            </Row>
            <ProductCard style={{paddingRight: '1px', paddingLeft: '1px', marginLeft: '1px', marginRight: '1px'}} key={`product-card-${key}`}/>
        </div>
        <Outlet />
    </>
    );
}

export default Catalog;
