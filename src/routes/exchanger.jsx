import {useEffect, useState} from "react";
import Dropdown from "../components/Dropdown/Dropdown.jsx";
import axios from "axios";
import {endpointPath} from "../config/api.js";

export default function Exchanger(){
    const [to, setTo] = useState("EUR - Euro (€)")
    const [from, setFrom] = useState("UAH - Ukrainian Hryvnia (₴)")
    const [amount, setAmount] = useState(100)
    const [currencyResult, setCurrencyResult] = useState("")
    const [currencyRate, setCurrencyRate] = useState("")

    const convertCurrency = async (from, to, amount) => {
        const amountValue =
            typeof amount === "string" ? parseFloat(amount) : amount;

        if(amountValue === 0 | isNaN(amountValue) || amountValue < 0){
            setCurrencyResult("");
            return;
        }

        const fromValue = from.split(" ")[0].trim().toUpperCase();
        const intoValue = to.split(" ")[0].trim().toUpperCase();
        const url = endpointPath(fromValue);
        try{
            const response = await axios.get(url);
            const parsedData = response.data;
            console.log(parsedData)
            if(intoValue in parsedData.conversion_rates){
                const currencyRate = parsedData.conversion_rates[intoValue];
                const currencyResult = amountValue * currencyRate;

                setCurrencyResult(currencyResult.toFixed(3));
                setCurrencyRate(currencyRate.toFixed(3));
            }else{
                console.log("Error while converting currency: Invalid data")
            }
        }catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(from && to){
            convertCurrency(from, to, amount)
        }
    }, [from, to, amount]);

    const handleFrom = (selectedOption) => {
        setFrom(selectedOption.value)
    }

    const handleTo = (selectedOption) => {
        setTo(selectedOption.value);
    }

    const handleInput = (e) => {
        setAmount(parseFloat(e.target.value))
    }

    return(
        <div>
            <h2>From</h2>
            <Dropdown
                handleChange={handleFrom}
                placeholder="Select a currency(From)"
                value={from}
            />
            <h2>To</h2>
            <Dropdown
                handleChange={handleTo}
                placeholder="Select a currency(To)"
                value={to}
            />
            <h2>Amount</h2>
            <input
                placeholder="Enter amount"
                value={amount}
                type="number"
                onChange={handleInput}
                min={0}
            />
            <h2>Result: {currencyResult}</h2>
            <h2>Currency Rate: {currencyRate}</h2>
        </div>
    )
}