import { ExchangeRates } from 'types/api';
import { Currency } from 'types/Currency';
import { getRateFromRates } from './getRateFromRates';

export type NormalizedRates = {
  date: string;
  rate: number;
};

export const getNormalizedRates = (
  ratesObjs: ExchangeRates[],
  from: Currency,
  to: Currency
): NormalizedRates[] =>
  ratesObjs.map((rates) => ({
    date: rates.date,
    rate: getRateFromRates(rates, from, to),
  }));
