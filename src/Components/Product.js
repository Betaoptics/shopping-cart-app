import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";


function Product(props) {
    const [productCount, setProductCount] = useState(0);
	const [t] = useTranslation("main");

    // console.log("productCount init: ", productCount);

    const incrementOne = () => {
        setProductCount(productCount + 1);
        // console.log("productCount incremented: ", productCount);
    }

    const decrementOne = () => {
        if(productCount > 0) {
            setProductCount(productCount - 1);
        }
        // console.log("productCount decremented: ", productCount);
    }

    return (
        <>
            <h1>Count: {productCount}</h1>
            <Button 
                // key={`decrement-${props.index}`} 
                variant="primary" 
                className="pull-left" 
                onClick={decrementOne}
                >
                -
            </Button>
            <Form.Label>Add item</Form.Label>
            <Form.Control type="number" placeholder="0"></Form.Control>
            <Button 
                // key={`increment-${props.index}`} 
                variant="primary"
                className="pull-right"
                onClick={incrementOne}
                >
                +
            </Button>
        </>
    );
}

export default Product;
