import '../App.scss';
import Layout from "./Layout";
import {useState} from "react";
import './Exchanger.scss'

const mockedCurrencies = [
    {
        currency: "UAH",
        prices: {
            "USD": 0.027,
            "EUR": 0.026,
            "UAH": 0.98
        }
    },
    {
        currency: "USD",
        prices: {
            "UAH": 36.75,
            "EUR": 0.94,
            "USD": 0.98
        }
    },
    {
        currency: "EUR",
        prices: {
            "USD": 1.06,
            "UAH": 39.00,
            "EUR": 0.98
        }
    }
]

const Exchanger = () =>{
    const [currencies, setCurrencies] = useState(mockedCurrencies);
    const [inputs, setInputs] = useState({
        amount: 0,
        from: "UAH",
        to: "USD"
    });
    const [result, setResult] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        const from = inputs.from;
        const to = inputs.to;
        const currentCurrency = currencies.find((elem) => elem.currency === from);
        const price = currentCurrency.prices[to];
        const amount = inputs.amount;
        const newResult = amount * price;
        setResult(newResult);
    }


    return(
        <Layout>
            <form onSubmit={handleSubmit} className='exchanger-container'>
                <label>Amount:
                    <input type="number" name='amount' value={inputs.amount || ''} onChange={handleChange} required placeholder='Amount'/>
                </label>
                <label>From:
                    <select name="from" value={inputs.from || 'UAH'} onChange={handleChange} required>
                        <option value="UAH">UAH</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </label>
                <label>To:
                    <select name="to" value={inputs.to || 'USD'} onChange={handleChange} required>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="EUR">EUR</option>
                    </select>
                </label>
                <input type="submit" hidden />
                <div>
                    Total Sum: {result} {result ? inputs.to : null}
                </div>
            </form>

        </Layout>
    )
}
export default Exchanger;