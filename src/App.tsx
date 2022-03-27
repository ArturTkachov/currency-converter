import React, { ChangeEventHandler, useState } from 'react';
import Dropdown from 'components/Dropdown';
import CurrencyInput from 'components/CurrencyInput';
import useExchangeRates from 'hooks/useExchangeRates';
import { getProductToFixed, getQuotientToFixed } from 'utility/multiplication';
import PinkButton from 'components/PinkButton';
import ExchangeRate from 'components/ExchangeRate';
import RateChange from 'components/RateChange';
import { getRateFromRates } from 'utility/getRateFromRates';
import { Currencies, Currency } from 'types/Currency';
import './App.scss';

import PeriodRateChart from 'components/chart/PeriodRateChart';

function App() {
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('BYN');
  const currencies: Currencies = ['USD', 'BYN', 'RUB'];

  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const { data } = useExchangeRates(from);
  const rate = data ? getRateFromRates(data, from, to) : 1;

  const handleFromValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    setFromValue(String(value));
    setToValue(getProductToFixed(value, rate));
  };

  const handleToValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    setFromValue(getQuotientToFixed(value, rate));
    setToValue(String(value));
  };

  const [isSwapped, setIsSwapped] = useState(false);
  const handleSwap = () => {
    if (isSwapped) {
      setFromValue(getProductToFixed(+fromValue, rate));
      setToValue(getProductToFixed(+toValue, rate));
    } else {
      setFromValue(getQuotientToFixed(+fromValue, rate));
      setToValue(getQuotientToFixed(+toValue, rate));
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
      <div id="bottom-panels">
        <div>
          <PinkButton text="Swap" handleClick={handleSwap} />
        </div>
        <div>
          <ExchangeRate
            from={isSwapped ? to : from}
            to={isSwapped ? from : to}
          />
          <RateChange from={isSwapped ? to : from} to={isSwapped ? from : to} />
        </div>
      </div>
      <PeriodRateChart
        period="1w"
        from={isSwapped ? to : from}
        to={isSwapped ? from : to}
      />
    </main>
  );
}

export default App;
