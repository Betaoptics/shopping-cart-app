import React from 'react';
import dataEN from '../../../Utilities/Localization/fi_FI.json';
import dataFI from '../../../Utilities/Localization/fi_FI.json';
import { Card, Button } from 'react-bootstrap';

function MainFormView() {

    const datas = [dataEN, dataFI];

    // console.log("MainFormView: ", datas[0]);
    // console.log("\n");

    // let placeholder = datas[0][0].productName;
    // console.log("placeholder value: ", placeholder);
    // console.log("\n");

    // let breads = datas[0][1].productType;
    // console.log("breads:", breads);

    // let arr1 = datas[0].filter(obj => obj.productType === "Bread");
    // console.log("arr1 result:", arr1);
    // if(arr1) {
    //     // console.log("Bread");
    // }

    return (
        <div style={{paddingTop: "50px", paddingRight: '20px', paddingLeft: '20px'}}>
            <Card style={{boxShadow: "1px solid black"}}>
                <Card.Img variant="top" src="holder.js/100px180"></Card.Img>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    {/* <Button variant="primary">{placeholder}</Button> */}
                </Card.Body>
            </Card>
        </div>
    )
}

export default MainFormView;