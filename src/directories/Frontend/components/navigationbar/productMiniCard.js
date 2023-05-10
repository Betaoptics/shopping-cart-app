import React, { useRef, useState, } from "react";
import { Col, Row, Card, Button, Form, } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import data_FI from '../../../../localization/fi_FI.json';
import data_EN from '../../../../localization/en_US.json';

function ProductMiniCard(props) {

    const currentCount = useSelector((state) => state.storeData.count);
    console.log("currentCount: ", currentCount);
    const [productCount, setProductCount] = useState(currentCount);
    const [clicked, setClicked] = useState(false);
    const [message, setMessage] = useState('');
    const [errMsg, setErrMsg] = useState('');

    let product = props.product;

    const [products, SetProducts] = useState(product);
    const errRef = useRef();
	const [t] = useTranslation("main");
    const navigate = useNavigate();
    const location = useLocation();
    const datas = [data_FI, data_EN];
    const dispatch = useDispatch();

    console.log(props)

    const deleteProduct = (props) => {
        setProductCount(0);
        dispatch(productCount);
        if(currentCount === 0) {
            SetProducts(products => { return products.filter(item => item.id !== props.id)});
        }
    }

    const handleClick = () => {
        try {
            if(location.pathname === '/catalog' || location.pathname === '/minicard') {
                navigate('/history"', {replace: true});
                setClicked(!false);
                dispatch(product);
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

    const BACKENDPORT = 3500;
    const url3 = `http://localhost:${BACKENDPORT}/cart`;

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({product}) //404 Bad request. Fix the body of data!!!
    };

    return (
        <>
        <Card style={{ width: '20vw', 
        marginBottom: '1rem', 
        marginTop: '1rem', 
        height: '425px',
        }}
        key={`product-mini-card-ID-${product.id}`}
        >
            <Card.Header key={`minicard-header`}>Shopping-cart</Card.Header>
            <div style={{overflowY: 'scroll'}}>
            <Card.Body 
            key={`minicard-card-body`}
            >
            <Form>
                <Row>
                    <Col>
                    {products.products.map((product, index) => {
                      console.log("A product count: ", product.count);
                      return(
                        <>
                            {product.count >= 0 ? 
                            <Col key={`product-${product.id}-${index}`} style={{padding: '10px'}}>
                                <Row key={`product-row-${product.id}-${index}`}>
                                    <Col style={{display: 'flex', alignItems: 'center',}}>
                                        <Card.Text key={`minicard-productName-${product.productName}`} style={{overflowY: 'auto'}}>{product.productName}</Card.Text>
                                    </Col>
                                    {/* <Col>
                                        <div className="vl"></div>
                                    </Col> */}
                                    <Col xs={2} className='vl' key={`${product.id}-${index}-horizontal-line`}>
                                        <Button 
                                            variant="trash"
                                            className='align-items-mini'
                                            key={`product-id-${product.id}-${index}`} 
                                            // controlId={`product-counter-id-${product.id}`}
                                            value={productCount > 0? (productCount && props) : (0 && null)}
                                            onClick={() => {deleteProduct(product.id)}}>
                                                <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </Col>
                                </Row>
                                <hr key={`${product.id}-${index}-vertical-line`}></hr>
                          </Col> 
                          : 
                          <Col key={`product-null-${product.id}-${index}`}>
                                <Row>
                                </Row>
                          </Col>}
                        </>
                      );
                      }
                    )}
                    </Col>
                </Row>
            </Form>
            </Card.Body>
            </div>
            <div style={{display: 'flex', alignContent: 'center', borderTop: '1px solid rgba(0, 0, 0, .5)', backgroundColor: 'rgba(240, 240, 240, 1)'}}>
                <div style={{margin: '5px', marginLeft: '20px'}}>
                    <Button 
                        variant="calculator"
                        key={`product-submit`} 
                        // controlId={`product-submit`}
                        onClick={() => {handleClick()}}>
                        <p  style={{ marginBottom: '0rem'}}>Accept</p>
                    </Button>
                </div>
            </div>
        </Card>
        </>
    );
}

export default ProductMiniCard;
