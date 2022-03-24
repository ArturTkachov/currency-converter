import React, { ChangeEventHandler, useState } from 'react';
import Dropdown from 'components/Dropdown';
import CurrencyInput from 'components/CurrencyInput';
import useCurrencyRatios from 'hooks/useCurrencyRatios';
import { getProductToFixed, getQuotientToFixed } from 'utility/multiplication';
import { Currencies, Currency, LowercaseCurrency } from 'types/Currency';
import './App.css';

function App() {
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('BYN');
  const currencies: Currencies = ['USD', 'BYN', 'RUB'];

  const [fromValue, setFromValue] = useState('');
  const [toValue, seToValue] = useState('');

  const { data } = useCurrencyRatios(from);
  let ratio = data
    ? +data[from.toLowerCase() as LowercaseCurrency][
        to.toLowerCase() as LowercaseCurrency
      ]
    : 1;

  const handleFromValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    setFromValue(String(value));
    seToValue(getProductToFixed(value, ratio));
  };

  const handleToValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    setFromValue(getQuotientToFixed(value, ratio));
    seToValue(String(value));
  };

  return (
    <>
      <Dropdown
        labelText="From"
        options={currencies}
        currentOptionIndex={currencies.indexOf(from)}
        setOption={setFrom}
      />
      <CurrencyInput
        currency={from}
        value={fromValue}
        handleChange={handleFromValueChange}
      />
      <Dropdown
        labelText="To"
        options={currencies}
        currentOptionIndex={currencies.indexOf(to)}
        setOption={setTo}
      />
      <CurrencyInput
        currency={to}
        value={toValue}
        handleChange={handleToValueChange}
      />
    </>
  );
}

export default App;
