import { FC } from 'react';
import useCurrencyRatios from 'hooks/useCurrencyRatios';
import { Currency, LowercaseCurrency } from 'types/Currency';
import './ExchangeRatio.scss';

interface Props {
  from: Currency;
  to: Currency;
}

const ExchangeRatio: FC<Props> = (props) => {
  const { from, to } = props;
  const { data: ratios } = useCurrencyRatios(props.from);
  const ratio =
    ratios &&
    (+ratios[from.toLowerCase() as LowercaseCurrency][
      to.toLowerCase() as LowercaseCurrency
    ]).toFixed(4);

  return (
    <div className="exchange-ratio">
      <span>Current rate</span>
      <span>{ratio ? ratio : '0.0000'}</span>
    </div>
  );
};

export default ExchangeRatio;
