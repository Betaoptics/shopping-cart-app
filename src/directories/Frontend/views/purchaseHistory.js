'use strict';
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useSelector } from "react-redux";
import useTitle from "../hooks/useTitle";
import '../../../css/ag-grid-custom.css';

function PurchaseHistory() {
    useTitle("Purchase history");
    const PORT = 3500
    const URL_PATH = `http:/localhost:${PORT}`;
    const [t] = useTranslation("main");
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [budget, setBudget] = useState(0);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const data = useSelector((state) => state.storeData.data);
    const [rowData, setRowData] = useState(data.products); // Set rowData to Array of Objects, one Object per Row

    const BACKENDPORT = 3500;
    const url2 = `http://localhost:${BACKENDPORT}/history`;

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const [history, setHistory] = useState([]);

    useEffect(() => {
        try {
        fetch(url2, requestOptions)
            .then((res) => res.json())
            .then((history) => {
                if(history !== null || history !== undefined) {
                    console.log("Fetch sucess! history data: ", history);
                    setHistory(history);
                    // setRowData(history);
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

    console.log("history data: ", history);

    // const handleChange = (event, gridOptions) => {
    //     //Force conversion to int due to datatype mismatch otherwise.
    //     setBudget(parseInt(event.target.value));
        
    //     if(budget < 0) {
    //         setFlag(true);
    //         setBudget(parseInt(0));
    //     }

    //     if(isNaN(budget) || budget === null || budget === undefined) {
    //         setFlag(true);
    //         setBudget(parseInt(0));
    //     }

    //     return budget;
    // }

    const userBudget = 100;
    const caloriesPerDay = 2500;

    const getColumnDefs = () => {
        return [
            {field: 'boughtDate', filter: true, headerName: `${t('datagrid.boughtDate')}`, valueFormatter: dateFormatter},
            {field: 'id', filter: true, width: 90, maxWidth: 90},
            {field: 'productName', filter: true},
            {field: 'productType', filter: true},
            {
                field: 'calories', 
                filter: true,
                cellStyle: params => {
                    if (params.value <= caloriesPerDay-500) {
                        return {color: '#12b500'};
                    } else if(params.value >= caloriesPerDay+500) {
                        return {color: 'red'};
                    } else {
                        return {color: 'black'};
                    }
                },
            },
            {
                field: 'priceOfProduct', 
                filter: true,
                valueFormatter: currencyFormatter,
                cellStyle: params => {
                    if (params.value < 4.8) {
                        return {color: '#12b500',};
                    } else if(params.value > 5) {
                        return {color: 'red', };
                    } else {
                        return {color: 'black'};
                    }
                },
            },
            {field: 'lastUseDate', filter: true, valueFormatter: dateFormatter},
            {field: 'count', filter: true,},
            {
                field: 'Sum of Calories', 
                filter: true, 
                headerName: `Sum of calories`, 
                colID: 'sumOfCals', 
                valueGetter: caloriesSummary,
                cellStyle: params => {
                    if (params.value <= caloriesPerDay-500) {
                        return {color: '#12b500'};
                    } else if(params.value >= caloriesPerDay+500) {
                        return {color: 'red'};
                    } else {
                        return {color: 'black'};
                    }
                },
            },
            {
                field: 'Sum of prize', 
                filter: true, 
                headerName: `Sum of prize`, 
                colID: 'sumOfPrize', 
                valueGetter: prizeSummary,
                valueFormatter: currencyFormatter,
                cellStyle: params => {
                    if (params.value < 4.8) {
                        return {color: '#12b500',};
                    } else if(params.value > 5) {
                        return {color: 'red', };
                    } else {
                        return {color: 'black'};
                    }
                },
            },
          ];
      };
      
      function dateFormatter(params) {
        const year = params.value.split("-")[0];
        const month = params.value.split("-")[1];
        const day = params.value.split("-")[2].split("T")[0];
        const newFormat = (day + "-" + month + "-" + year);
        return newFormat;
      }

      function currencyFormatter(params) {
        return params.value + ' €';
      }

      function caloriesSummary(params) {
        return params.data.calories * params.data.count;
      }

      function prizeSummary(params) {
        return params.data.priceOfProduct * params.data.count;
      }

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState(getColumnDefs());

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          minWidth: 100,
          sortable: true,
          filter: true,
        };
      }, []);

      const autoGroupColumnDef = useMemo(() => {
        return {
          minWidth: 200,
        };
      }, []);

    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    return (
        <div className='App' style={{padding: '10px'}}>
             {/* Example using Grid's API */}
            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div style={{padding: '0px'}}>
                <h3>How to read:</h3>
                <p><span>Text with black coloration is neutral</span></p>
                <p>Text with <span style={{color: '#12b500'}}>green</span> coloration is <span style={{color: '#12b500'}}>good</span></p>
                <p style={{paddingBottom: '5px'}}>Text with <span style={{color: 'red'}}>red</span> coloration is <span style={{color: 'red'}}>bad</span></p>
            </div>
            <div className="ag-theme-alpine ag-theme-acmecorp"
             style={{
                height: '100vh',
                boxShadow: '5px 5px 5px rgba(200, 200, 200, .8)'}}>
                <AgGridReact
                    // ref={gridRef} // Ref for accessing Grid's API
                    defaultColDef={defaultColDef} // Default Column Properties
                    autoGroupColumnDef={autoGroupColumnDef}
                    // rowSelection='multiple' // Options - allows click selection of rows
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowData={rowData} // Row Data for Rows
                    columnDefs={columnDefs} // Column Defs for Columns
                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>
        </div>
    )
}

export default PurchaseHistory;