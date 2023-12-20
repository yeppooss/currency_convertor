import {useEffect, useState} from "react";
import Dropdown from "../components/Dropdown/Dropdown.jsx";
import {endpointPath} from "../config/api.js";
import DataTable from 'react-data-table-component';
import axios from "axios";

export default function Rate(){
    const [baseCurrency, setBaseCurrency] = useState("UAH - Ukrainian Hryvnia (₴)")
    const [currencyData, setcurrencyData] = useState([])
    const handleBaseCurrency = (selectedOption) =>{
        setBaseCurrency(selectedOption.value);
    }

    const loadData = async () =>{
        const baseCurrencyValue = baseCurrency.split(" ")[0].trim()
        const url = endpointPath(baseCurrencyValue);
        try{
            const response = await axios.get(url);
            const parsedData = response.data.conversion_rates;
            setcurrencyData(parsedData);

        }catch (error){
            console.log(error)
        }
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Rate',
            selector: row => row.rate,
            sortable: true,
        },
    ];

    const renderData = () =>{
        const elements = [];

        for (const key in currencyData) {
            if (currencyData.hasOwnProperty(key)) {
                elements.push(
                    {
                        name: key,
                        rate: currencyData[key]
                    }
                );
            }
        }

        return elements;
    }

    useEffect(() => {
        loadData(baseCurrency);
    }, [baseCurrency]);

    return(
        <div>
            <div>
                <h2>Base Currency: </h2>
                <Dropdown
                    handleChange={handleBaseCurrency}
                    value={baseCurrency}
                    placeholder="Select a base currency"
                />
            </div>
            <DataTable columns={columns} data={renderData()} pagination/>
        </div>
    )
}