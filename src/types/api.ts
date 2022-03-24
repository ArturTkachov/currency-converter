import { LowercaseCurrency } from './Currency';

export type CurrencyRatios = {
  [key in LowercaseCurrency]: {
    [key in LowercaseCurrency]: string;
  };
};
