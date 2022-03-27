import { ExchangeRates } from '../types/api';
import { Currency, LowercaseCurrency } from '../types/Currency';

export const getRateFromRates = (
  rates: ExchangeRates,
  from: Currency,
  to: Currency
): number =>
  +rates[from.toLowerCase() as LowercaseCurrency][
    to.toLowerCase() as LowercaseCurrency
  ];
