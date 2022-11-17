import React from 'react';
import dataEN from '../../Utilities/Localization/en_US.json';
import dataFI from '../../Utilities/Localization/fi_FI.json';

function FetchData() {

    const datas = [dataEN, dataFI];
    // console.log("datas array: ", datas, "\n");
    // console.log("\n");
    // console.log("datas array English version: ", datas[0], "\n");
    // console.log("\n");
    // console.log("datas array Finnish version: ", datas[1], "\n");
    // console.log("\n");
    
    const EN_Data = dataEN;
    // console.log("EN_Data: ", EN_Data);
    // console.log("\n");

    const FI_Data = dataFI;
    // console.log("FI_Data: ", FI_Data);
    // console.log("\n");

    return (
        <div>
            
        </div>
    )
}

export default FetchData;