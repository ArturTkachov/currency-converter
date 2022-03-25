import { LowercaseCurrency } from './Currency';

export type ExchangeRates = {
  [key in LowercaseCurrency]: {
    [key in LowercaseCurrency]: string;
  };
};
