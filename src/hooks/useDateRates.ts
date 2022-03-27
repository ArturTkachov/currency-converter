import useSWR from 'swr';
import { Currency } from 'types/Currency';
import { ExchangeRates } from 'types/api';

export const getCurrencyRatios = async (
  currency: Currency,
  date: string
): Promise<ExchangeRates> => {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${currency.toLowerCase()}.min.json`
  );

  return await res.json();
};

const useDateRates = (currency: Currency, date: string) => {
  const { data, error } = useSWR([currency, date], getCurrencyRatios);

  return {
    data,
    isError: error,
    isLoading: !error && !data,
  };
};

export default useDateRates;
