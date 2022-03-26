import React, { FC } from 'react';
import useExchangeRates from 'hooks/useExchangeRates';
import useDateRates from 'hooks/useDateRates';
import { getFormattedDateString } from '../utility/getFormattedDateString';
import { Currency, LowercaseCurrency } from 'types/Currency';
import './RateChange.scss';

interface Props {
  from: Currency;
  to: Currency;
}

const ExchangeRateChange: FC<Props> = React.memo((props) => {
  const { from, to } = props;

  const { data: rates } = useExchangeRates(from);

  const yesterday = new Date(Date.now() - 86400000);
  const dateString = getFormattedDateString(yesterday);
  const { data: yesterdaysRates } = useDateRates(from, dateString);

  const rate1 = rates
    ? +rates[from.toLowerCase() as LowercaseCurrency][
        to.toLowerCase() as LowercaseCurrency
      ]
    : 1;
  const rate2 = yesterdaysRates
    ? +yesterdaysRates[from.toLowerCase() as LowercaseCurrency][
        to.toLowerCase() as LowercaseCurrency
      ]
    : 1;

  const difference = rate1 - rate2;
  const percentage = (difference / rate2) * 100;
  const didGrow = difference >= 0;

  return (
    <div className={`exchange-rate-change ${didGrow ? 'grew' : ''}`}>
      <span>Today's change</span>
      <span>
        {`${Math.abs(difference).toFixed(4)} (${String(percentage).slice(
          0,
          6
        )}%)`}
      </span>
    </div>
  );
});

export default ExchangeRateChange;
