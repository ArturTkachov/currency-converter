import React, { FC } from 'react';
import useExchangeRates from 'hooks/useExchangeRates';
import { Currency, LowercaseCurrency } from 'types/Currency';
import './ExchangeRate.scss';

interface Props {
  from: Currency;
  to: Currency;
}

const ExchangeRate: FC<Props> = React.memo((props) => {
  const { from, to } = props;
  const { data: ratios } = useExchangeRates(props.from);
  const ratio =
    ratios &&
    (+ratios[from.toLowerCase() as LowercaseCurrency][
      to.toLowerCase() as LowercaseCurrency
    ]).toFixed(4);

  return (
    <div className="exchange-rate">
      <span>Current rate</span>
      <span>{ratio ? ratio : '0.0000'}</span>
    </div>
  );
});

export default ExchangeRate;
