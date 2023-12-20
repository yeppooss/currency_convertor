import Select, {components} from "react-select";
import {currency} from "../../config/currency.js";
const {Option} = components;

function OptionComponent(props){
    return (
        <Option {...props}>
            <span className={`currency-flag currency-flag-${props.data.value}`} />{" "}
            {props.data.label}
        </Option>
    );
}

export default function Dropdown(props){
    const {handleChange, placeholder, value} = props;

    const selectValue = currency.find((option) => option.value === value || option.label === value)
    return(
        <Select
            options={currency}
            onChange={handleChange}
            placeholder={placeholder}
            value={selectValue}
            components={{Option: OptionComponent}}
        />
    )
}