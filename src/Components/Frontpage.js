import { useTranslation } from "react-i18next";
import { Col, Row, Card } from "react-bootstrap";
import ProductCard from "./ProductCard";

function Frontpage() {
	const [t] = useTranslation("main");

    let array = [];
    if(array && array.length > 0) {
        console.log("true!");
    } else {
        console.log("false!");
    }

    return (
    <div>
        <div className="container-fluid">
            <Row>
                <Col className="text-center">
                    <h1 className="m-5">{t('frontpage.text.welcome')}</h1>
                </Col>
            </Row>
            {/* <Row> */}
                <ProductCard/>
            {/* </Row> */}
            {/* <Row>
                <button onClick={handleClick}>Navigate to Login</button>
            </Row> */}
        </div>
    </div>
    );
}

export default Frontpage;
