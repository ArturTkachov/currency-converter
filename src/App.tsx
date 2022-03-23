import React, { useState } from 'react';
import Dropdown from 'components/Dropdown';
import { Currencies, Currency } from 'types/Currency';
import './App.css';

function App() {
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('BYN');
  const currencies: Currencies = ['USD', 'BYN', 'RUB'];

  return (
    <>
      <Dropdown
        labelText="From"
        options={currencies}
        currentOptionIndex={currencies.indexOf(from)}
        setOption={setFrom}
      />
      <Dropdown
        labelText="To"
        options={currencies}
        currentOptionIndex={currencies.indexOf(to)}
        setOption={setTo}
      />
    </>
  );
}

export default App;
