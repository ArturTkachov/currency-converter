import { LowercaseCurrency } from './Currency';

export type ExchangeRates = { date: string } & {
  [key in LowercaseCurrency]: {
    [key in LowercaseCurrency]: string;
  };
};
