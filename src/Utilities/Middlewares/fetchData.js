import React from 'react';
import FinnishData from '../Localization/fi_FI.json';
import EnglishData from '../Localization/en_US.json';
import i18next from "i18next";

export default async function fetchData() {
    let promise = new Promise((resolve, reject) => {
        let response = {};
        const PORT = 8080;
        let url = `http://localhost:${PORT}/products/`;
        setTimeout(()=>{
            
        }, 1000);

        
        // console.log("FinnishData: ", FinnishData);
        // console.log("EnglishData: ", EnglishData);
        const datas = [FinnishData, EnglishData];
        // console.log("datas in fetchData:", datas);
    
        const FinnishProducts = datas[0].products;
        const EnglishProducts = datas[1].products;
    
        datas.map((products, index)=>{
            // console.log("datas inside map: ", datas[1].products);
            // console.log("products inside map: ", products);
        })
    
        if(EnglishProducts) {
            // console.log("English products in Fetch: ", EnglishProducts);
        }    

        let formData = new FormData();
        formData.append("products", EnglishProducts.products);

        response = [...EnglishProducts];

        fetch(`${url}${formData}`, {
            // body: JSON.stringify(formData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "GET"

        })
        // .then((response)=>response.json())
        // .then(console.log("response successful: ", response))
        .then((response) => {
            if(response.status === 200) {
                console.log("Ok! Response status: ", response.status);
                return response.json();
            } else if(response.status >= 404) {
                console.log("Error! Bad response from server & status: ", response.status);
            } else if(response.status >= 500) {
                console.log("Unknown error! Response status: ", response.status);
            }
        })
        .then(resolve);
       
    });

    const result = await promise;
    console.log("result is: ", result);

   
//     if(i18next.language === 'en_US' && datas[1]) {
//         console.log("English products in Fetch: ", EnglishProducts);
//     }
}