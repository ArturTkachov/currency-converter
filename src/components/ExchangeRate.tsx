import React, { FC } from 'react';
import useExchangeRates from 'hooks/useExchangeRates';
import { Currency } from 'types/Currency';
import './ExchangeRate.scss';

interface Props {
  from: Currency;
  to: Currency;
}

const ExchangeRate: FC<Props> = React.memo((props) => {
  const { from, to } = props;
  const { data } = useExchangeRates(from);
  const rate = data && data.rates[to];

  return (
    <div className="exchange-rate">
      <span>Current rate</span>
      <span>{rate ? rate : '0.0000'}</span>
    </div>
  );
});

export default ExchangeRate;
