import { Currency } from './Currency';

export type ExchangeRates = {
  date: string;
  base: Currency;
  rates: {
    [key in Currency]: number;
  };
};
