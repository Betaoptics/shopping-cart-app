import React from 'react';
import { useTranslation } from "react-i18next";
import { Col, Row, Container, } from "react-bootstrap";
import products from '../../../../localization/products.json';
import _ from 'lodash';
import ProductMiniCard from './productMiniCard';
import NavigationBar from './navigationBar';

function ProductMiniCardWrapper(props) {
  const [t] = useTranslation("main");

  // console.log("Products: ", products);

  return (
      <div key={`productMiniCardWrapper-collection`}>
        <NavigationBar/>
        <Container> 
          <Row>
          <Col key={`product-${products.id}`}>
            <ProductMiniCard key={`minicardID-${products.id}`} product={products}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default ProductMiniCardWrapper;