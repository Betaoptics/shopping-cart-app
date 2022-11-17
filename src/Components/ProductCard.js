import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Col, Row, Card, Button, Stack, Form, } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
// import BreadSample from '../Images/Bread_Sample.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import data_FI from '../Utilities/Localization/fi_FI.json';
import data_EN from '../Utilities/Localization/en_US.json';
import i18next from "i18next";
import fetchData from '../Utilities/Middlewares/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { storedData } from '../Redux/featrures/storeDataSlice';

// import { I18nextProvider } from 'react-i18next';
// import { set } from 'react-hook-form';


function ProductCard(props) {
    const [productCount, setProductCount] = useState(0);
	const [t] = useTranslation("main");
    const navigate = useNavigate();
    const datas = [data_FI, data_EN];
    const updatedCounter = useSelector((state) => state.storeData.data);
    const dispatch = useDispatch();

    // console.log("datas in ProducCard: ", datas);
    const FinnishProducts = datas[0].products;
    const EnglishProducts = datas[1].products;
    // console.log("Finnish data: ", FinnishProducts);
    // console.log("English data: ", EnglishProducts);
    // const getPorductFI = FinnishProducts;
    // console.log("productFI: ", getPorductFI);

    // let test = FinnishProducts[0];
    // console.log("testing: ", test);

    // let breads = test.productType;
    // console.log("breads: ", breads);

    // const GetDatas = () => {
    //     const productData = FinnishProducts.map((data, index) => {
    //         const newData = data;
    //         console.log("newData", newData);
    //         return newData;
    //     })
    //     console.log("productData", productData);
    //     return productData;
    // }
    // let placeholder = datas[0][0].productName;
    // console.log("placeholder value: ", placeholder);
    // console.log("\n");

    // let breads = datas[0][1].productType;
    // console.log("breads:", breads);

    // let arr1 = datas[0].filter(obj => obj.productType === "Bread");
    // console.log("arr1 result:", arr1);
    // if(arr1) {
    //     console.log("Bread");
    // }

    // const handleRoom = (event, id) => {
    //     const { value } = event.target;
    //     setRooms((room) => 
    //         room?.map((list, index) => {
    //             index === id ? { ... list, room: value } : list
    //         })
    //     )
    // }

    const rooms = [
        {
          id: 1,
          room: "2000",
          sold: "2"
        },
        {
          id: 2,
          room: "1000",
          sold: "0"
        },
        {
          id: 3,
          room: "500",
          sold: "0"
        },
        {
          id: 4,
          room: "0",
          sold: "0"
        },
        {
          id: 5,
          room: "0",
          sold: "0"
        },
        {
          id: 6,
          room: "0",
          sold: "0"
        },
        {
          id: 7,
          room: "0",
          sold: "0"
        }
      ];

    // console.log("rooms: ", rooms);
    console.log("FinnishProducts: ", FinnishProducts);
    const [roomes, setRooms] = useState([...rooms]);
    console.log("roomes: ", roomes);

    const handleroom = (event, id) => {
        const { value } = event.target;
        setRooms((room) =>
          room?.map((list, index) =>
            index === id ? { ...list, room: value } : list
          )
        );
      };

    console.log("productCount init: ", productCount);

    let tempArray = [...FinnishProducts];

    const incrementOne = (event, index) => {
        const { value } = event.target;
        // console.log("event: ", event);
        if(productCount < 10000) {
            tempArray[index].count++;
            setProductCount(productCount + 1);
        }
        return value; //maybe?
    }

    const decrementOne = (event, index) => {
        const { value } = event.target;
        if(productCount > 0) {
            tempArray[index].count--;
            setProductCount(productCount - 1);
        }
        console.log("productCount decremented: ", tempArray[index].count);
        return value; //maybe?
    }

    const handleChange = (event, index) => {
        setProductCount(event.target.value)
        if(props.onChange) {
            props.onChange(productCount);
        }
    }

    const [improvedProductCount, setImprovedProductCount] = useState([...FinnishProducts]);

    // console.log("roo: ", improvedProductCount);

    const incrementOneImproved = (event, id) => {
        const { value } = event.target;
        setImprovedProductCount((count) =>
          count?.map((list, index) =>
            index === id ? { ...list, count: value } : list,
         
        // current value    
        // console.log("count: ", value),
          )
        );
      };

    
    // useEffect(()=>{
    //     fetchData();
    // },[]);
   

    const retreiveData = () => {
        if(i18next.language === 'en_US' && datas[1]) {
            console.log("current language: ", i18next.language);
            console.log("English!");
            return (
                <>
                    {EnglishProducts.map((product, index) => {
                        // console.log("product: ", product);
                        return (
                            <div key={product.id}>
                            <Card style={{ width: '18rem', margin: '4rem', padding: '4rem' }}>
                            <Card.Header>ID: {product.id}</Card.Header>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Title>{product.productType}</Card.Title>
                                <Card.Text>
                                {product.productType}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </div>    
                        )
                    }
                )}
                </>
                )
        } else {
            // console.log("Finnish!");
            return (
                <>
                    {FinnishProducts !== undefined ? FinnishProducts.map((product, index) => {
                        // console.log("product: ", product);
                        console.log("product.count: ", product.count);
                        return (
                            <div key={product.id}>
                            <Card style={{ width: '25vw', margin: '4rem', padding: '4rem' }}>
                            <Card.Header>ID: {product.id}</Card.Header>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Title>{product.productType}</Card.Title>
                                <Card.Text>
                                {product.productType}
                                </Card.Text>
                                <Form>
                                    <Form.Group className="mb-3" controlId={`counter-${index}`}>
                                    <h1>Count: {product.count}</h1>
                                    <Form.Label>Add item</Form.Label>
                                    <Row>
                                        <Col 
                                            className="col-sm-auto" 
                                            style={{paddingRight: "1px"}}>
                                        <Button 
                                            key={`increment-${index}`} 
                                            // size="sm"
                                            variant="primary"
                                            // className="pull-right"
                                            value={product.count >= 0? product.count : 0}
                                            onClick={(event) => { 
                                                incrementOne(event, index); 
                                                // dispatch(storedData(product));
                                            }}
                                            >
                                            +
                                        </Button>
                                        </Col>
                                        <Col 
                                        style={{paddingLeft: "1px", paddingRight: "1px"}}>
                                        <Form.Control 
                                        type="number" 
                                        className="col-sm-auto text-center"
                                        placeholder="0"
                                        // value={productCount}
                                        value={product.count >= 0? product.count : 0}
                                        onChange={(event) => {
                                            handleChange(event, index);
                                            // dispatch(storedData(product));
                                        }}
                                        ></Form.Control>
                                        </Col>
                                        <Col
                                            style={{paddingLeft: "1px"}}>
                                        <Button
                                            className="col-sm-auto"
                                            // style={{padding: ""}}
                                            key={`decrement-${index}`} 
                                            // size="sm" 
                                            variant="primary" 
                                            // className="pull-left" 
                                            value={product.count > 0? product.count : 0}
                                            onClick={(event) => { 
                                                decrementOne(event, index);
                                                // dispatch(storedData(product));
                                            }}
                                            >
                                            -
                                        </Button>
                                        </Col>
                                        </Row>
                                        {/* <input
                                            name="roomRent"
                                            type="text"
                                            value={product.count}
                                            onChange={(event) => incrementOneImproved(event, index)}
                                        /> */}
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            </Card>
                        </div>    
                        )
                    }
                ) : null}
                {improvedProductCount.map((productData, index) => {
                    // console.log("productData map: ", productData);
                    return (
                        <>
                        <div style={{paddingBottom: "5px"}}
                        key={`${productData.id}-${index}`}
                        >
                            <input
                                name="roomRent"
                                type="number"
                                value={productData.count}
                                onChange={(event) => incrementOneImproved(event, index)}
                            />
                        </div>
                        </>
                    )
                })}
                {roomes.map((roomData, index) => {
                      return (
                        <>
                          <div>
                            <div
                              key={roomData.id}
                            >
                              <input
                                name="roomRent"
                                type="text"
                                value={roomData.room}
                                onChange={(event) => handleroom(event, index)}
                              />
                            </div>
                            <div>
                              <p>{roomData.sold} Sold</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </>
            )
        }
    }

    const handleClick = () => {
        // 👇️ replace set to true
        navigate('/', {replace: true});
      };

    return (
        <div>
            <Row>
                <Col>
                    <Stack direction="horizontal" gap={2}>
                    <Button variant="primary" onClick={handleClick}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft}/> Navigate to Login
                        </Button>
                        <Button variant="primary" onClick={handleClick}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                        </Button>
                        <Button variant="primary" onClick={handleClick}>Navigate to Login</Button>
                    </Stack>
                </Col>
            </Row>
            {retreiveData()}
            {/* <p>{GetDatas()}</p> */}
            <Col>
            </Col>
            <div className="container-fluid">
                <Row className="justify-content-md-center">
                    <Card style={{ width: '18rem', margin: '4rem', padding: '4rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        
                    </Card.Body>
                    </Card>
                </Row>
            </div>
        </div>
    );
}

export default ProductCard;
