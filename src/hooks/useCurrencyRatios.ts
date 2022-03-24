import useSWR from 'swr';
import { Currency } from '../types/Currency';
import { CurrencyRatios } from '../types/api';

export const getCurrencyRatios = async (
  currency: Currency
): Promise<CurrencyRatios> => {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.toLowerCase()}.min.json`
  );
  return await res.json();
};

const useCurrencyRatios = (currency: Currency) => {
  const { data, error } = useSWR(currency, getCurrencyRatios);

  return {
    data,
    isError: error,
    isLoading: !error && !data,
  };
};

export default useCurrencyRatios;
