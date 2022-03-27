import { ExchangeRates } from 'types/api';
import { Currency } from 'types/Currency';

export type NormalizedRates = {
  date: string;
  rate: number;
};

export const getNormalizedRates = (
  ratesObjs: ExchangeRates[],
  to: Currency
): NormalizedRates[] =>
  ratesObjs.map((rates) => ({
    date: rates.date,
    rate: rates.rates[to],
  }));
