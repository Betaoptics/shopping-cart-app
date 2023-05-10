import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Col, Row, Container, } from "react-bootstrap";
import products from '../../../localization/products.json';
import useAuth from "../../Frontend/hooks/useAuth";
import i18next from "i18next";
import Product from './product';
import _ from 'lodash';

function ProductCard() {

  const [t] = useTranslation("main");
  const [isloading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { username, isManager, isAdmin } = useAuth();

  console.log("Products: ", products);

  const BACKENDPORT = 3500;
  const url2 = `http://localhost:${BACKENDPORT}/catalog`;

  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  };

  const [data, setData] = useState([]);

useEffect(() => {
    try {
      fetch(url2, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            if(data !== null || data !== undefined) {
                console.log("Fetch sucess! data: ", data);
                setData(data);
                setIsLoading(false);
            } else {
                console.log("Error! Data not found");
            }
        })
        .then((message) => setMessage(message))
    } catch (err) {
      console.log(err);
    }
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        fetch(url2, requestOptions)
          .then((res) => res.json())
          .then((data) => {
              if(data !== null || data !== undefined) {
                  console.log("Fetch sucess! data: ", data);
                  setData(data);
              } else {
                  console.log("Error! Data not found");
              }
          })
          .then((message) => setMessage(message))
      } catch (err) {
        console.log(err);
      }
    }, 1000000000);
    return () => clearInterval(interval);
  }, [url2, requestOptions]);

  console.log("setData: ", data);

  const retreiveData = () => {
          console.log("current language: ", i18next.language);
          //Check if data is loading and render data only after it has been loaded.
          if(!isloading) {
          return (
              <>
              <Container> 
                <Row>
                    {data.map((product, index) => {
                        return (
                            <Col xs={4} md={4} lg={4} sm={4} xl={4} xxl={4} style={{paddingLeft: "5px", paddingRight: "5px",}} key={`product-${product.id}-${index}`}>
                                <Product key={product.id} product={product}/>
                            </Col>
                          )
                      }
                  )}
                </Row>
              </Container>
              </>
            ) 
          } else {
            return <div>Loading...</div>
          }
        }

  return (
      <div key={`producCard-collection`}>
          {retreiveData()}
      </div>
    );
}

export default ProductCard;