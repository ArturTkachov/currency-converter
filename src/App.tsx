import React, { ChangeEventHandler, useState } from 'react';
import Dropdown from 'components/Dropdown';
import CurrencyInput from 'components/CurrencyInput';
import useCurrencyRatios from 'hooks/useCurrencyRatios';
import { getProductToFixed, getQuotientToFixed } from 'utility/multiplication';
import PinkButton from './components/PinkButton';
import { Currencies, Currency, LowercaseCurrency } from 'types/Currency';
import './App.scss';

function App() {
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('BYN');
  const currencies: Currencies = ['USD', 'BYN', 'RUB'];

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

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
    setToValue(getProductToFixed(value, ratio));
  };

  const handleToValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    setFromValue(getQuotientToFixed(value, ratio));
    setToValue(String(value));
  };

  const [isSwapped, setIsSwapped] = useState(false);
  const handleSwap = () => {
    if (isSwapped) {
      setFromValue(getProductToFixed(+fromValue, ratio));
      setToValue(getProductToFixed(+toValue, ratio));
    } else {
      setFromValue(getQuotientToFixed(+fromValue, ratio));
      setToValue(getQuotientToFixed(+toValue, ratio));
    }
    setIsSwapped(!isSwapped);
  };
  return (
    <main>
      <div id="currency-panels" className={isSwapped ? 'swapped' : ''}>
        <div>
          <Dropdown
            labelText={isSwapped ? 'To' : 'From'}
            options={currencies}
            currentOptionIndex={currencies.indexOf(from)}
            setOption={setFrom}
          />
          <CurrencyInput
            currency={from}
            value={fromValue}
            handleChange={handleFromValueChange}
          />
        </div>
        <div>
          <Dropdown
            labelText={isSwapped ? 'From' : 'To'}
            options={currencies}
            currentOptionIndex={currencies.indexOf(to)}
            setOption={setTo}
          />
          <CurrencyInput
            currency={to}
            value={toValue}
            handleChange={handleToValueChange}
          />
        </div>
      </div>
      <PinkButton text="Swap" handleClick={handleSwap} />
    </main>
  );
}

export default App;
