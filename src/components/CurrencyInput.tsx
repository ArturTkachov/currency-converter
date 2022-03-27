import { ChangeEventHandler, FC } from 'react';
import { Currency, CurrencySignsMap } from 'types/Currency';
import './CurrencyInput.scss';

interface Props {
  currency: Currency;
  value: number | string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const CurrencyInput: FC<Props> = (props) => {
  const curSigns: CurrencySignsMap = {
    USD: '$',
    EUR: '€',
    CZK: 'Kč',
  };
  const sign = curSigns[props.currency];

  return (
    <div className="currency-input">
      <span>{sign}</span>
      <input
        type="number"
        placeholder="0,0"
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default CurrencyInput;
