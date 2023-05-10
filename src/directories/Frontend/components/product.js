import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Button, Form, } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import '../../../css/bootstrap-custom.css';

function Product(props) {

    let product = props.product;

    const BACKENDPORT = 3500;
    const baseurl = `http://localhost:${BACKENDPORT}/cartRow`
    const queryParams = `productID=${product._id}`;
    const GET_URL = `${baseurl}?${queryParams}`;
    const url2 = `http://localhost:${BACKENDPORT}/cartRow?${queryParams}`;
    const url3 = `http://localhost:${BACKENDPORT}/cartRow`;

    const [productCount, setProductCount] = useState(0);
	const [t] = useTranslation("main");
    const [message, setMessage] = useState("");
    const [data, setData] = useState({});
    const [flag, setFlag] = useState(false);
   
    const incrementOne = () => {
        setFlag(true);
        setProductCount(prev => prev + 1);
    }

    const decrementOne = () => {
        if(productCount > 0) {
            setFlag(true);
            setProductCount(prev => prev - 1);
        }
    }

    const handleChange = (event) => {
        //Force conversion to int due to datatype mismatch otherwise.
        setProductCount(parseInt(event.target.value));
        
        if(productCount < 0) {
            setFlag(true);
            setProductCount(parseInt(0));
        }

        if(isNaN(productCount) || productCount === null || productCount === undefined) {
            setFlag(true);
            setProductCount(parseInt(0));
        }
        return productCount;
    }

    if(isNaN(productCount) || productCount === null || productCount === undefined) {
        setProductCount(parseInt(0));
    }

    const imageName = product.productName;
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    // console.log("DATE current: ", date);

    const reqBody = {
      "productID": product._id,
      "count": productCount,
      "boughtDate": date
    };

    const getData = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    const sendData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    };

    const updateData = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    };

    const deleteData = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    };

    const InitializeCart = () => {
        fetch(url2, getData)
            .then((res) => res.json())
            .then((data) => {
                console.log("data: ", data);
                // setData(data);
                if(data.count) {
                    if(data.count > 0) {
                        setCartExists(true);
                    }
                    setProductCount(data.count);
                    console.log("setProductCount: ", data.count);
                }
            })
            .then((message) => setMessage(message))
    }

    const createCart = () => {
        fetch(url3, sendData)
            .then((res) => res.json())
            .then((data) => {
                if(data !== null || data !== undefined) {
                    console.log("POST sucess! data: ", data);
                    setData(data);
                } else {
                    console.log("Error! Data not found.");
                }
            })
            .then((message) => setMessage(message))
    }

    const updateCart = () => {
        fetch(url3, updateData)
            .then((res) => res.json())
            .then((data) => {
                if(data !== null || data !== undefined) {
                    console.log("POST sucess! data: ", data);   
                    setData(data);
                } else {
                    console.log("Error! Data not found.");
                }
            })
            .then((message) => setMessage(message))
    }

    const deleteCart = () => {
        fetch(url3, deleteData)
            .then((res) => res.json())
            .then((data) => {
                if(data !== null || data !== undefined) {
                    console.log("POST sucess! data: ", data);   
                    setData(data);
                    console.log("No longer first time.");
                } else {
                    console.log("Error! Data not found.");
                }
            })
            .then((message) => setMessage(message))
    }

    const [cartExists, setCartExists] = useState(false);

    useEffect(() => {
        try {
            console.log("Initalized!");
            InitializeCart();
        } catch(err) {

        }
    }, [])

    useEffect(() => {
        if(flag) {
            try {
                console.log(cartExists, productCount);
                if(productCount === 0 && cartExists) {
                    console.log("Delete product.");
                    deleteCart();
                    setCartExists(false);
                } else if(productCount > 0) {
                    console.log("Create/update product.");
                    if(!cartExists) {
                        createCart();
                    } else {
                        updateCart();
                    }
                    setCartExists(true);
                }  
            } catch (err) {

            }
        }
    }, [productCount]);

    return (
        <>
        <Card style={{ width: 'auto', height: 'auto', 
        boxShadow: '5px 5px 5px rgba(200, 200, 200, .8)',
        background: '#f6f6f6' 
        }}>
        <Card.Header>{t(product.localization)}</Card.Header>
            <Card.Img 
                variant="top"
                src={require(`../../../images/${imageName}.jpg`)} 
                key={`increment-${product.id}`} 
                value={productCount  >= 0? productCount : 0}
                onClick={(event) => { 
                    incrementOne(event);
                }}
            ></Card.Img>
            {/*NOTE!! Image name under folder: src/images/ in path:../../../images/<imgName>, has to match the name of products.productName in src/localization/products.json file. */}
            <Card.Body>
                <Card.Title>{t(product.localType)}</Card.Title>
                <Form>
                    <Form.Group className="mb-3" controlId={`counter-${product.id}`}>
                    <Row
                    style={{
                        marginLeft: '4rem',
                        marginRight: '4rem',  
                    }}
                    >
                        <Col 
                            className="col-sm-auto" 
                            style={{paddingRight: "1px"}}>
                        <Button 
                            key={`increment-${product.id}`} 
                            // size="sm"
                            // variant="success"
                            variant="default"
                            // className="pull-right"
                            value={productCount  >= 0? productCount : 0}
                            onClick={(event) => { 
                                incrementOne(event);
                            }}
                            >
                            +
                        </Button>
                        </Col>
                        <Col 
                        style={{paddingLeft: "1px", paddingRight: "1px"}}>
                        <Form.Control
                        // style={{background: '#f2f2f2' }} 
                        style={{background: '#ecffe6' }} 
                        type="number" 
                        className="col-sm-auto text-center"
                        placeholder="0"
                        key={`setCount-${product.id}`}
                        // value={productCount}
                        value={productCount >= 0? productCount : 0}
                        onChange={(event) => { 
                            handleChange(event);
                        }}
                        ></Form.Control>
                        </Col>
                        <Col
                            className="col-sm-auto"
                            style={{paddingLeft: "1px"}}>
                        <Button
                            // style={{padding: ""}}
                            key={`decrement-${product.id}`} 
                            // size="sm" 
                            // variant="success" 
                            variant="default" 
                            // className="pull-left" 
                            value={productCount  > 0? productCount  : 0}
                            onClick={(event) => { 
                                decrementOne(event);
                            }}
                            >
                            -
                        </Button>
                        </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        </>
    );
}

export default Product;
