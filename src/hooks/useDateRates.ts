import useSWR from 'swr';
import { Currency } from 'types/Currency';
import { ExchangeRates } from 'types/api';

export const getCurrencyRatesForDate = async (
  currency: Currency,
  date: string
): Promise<ExchangeRates> => {
  const res = await fetch(
    `https://api.frankfurter.app/${date}?from=${currency}`
  );

  const json: ExchangeRates = await res.json();
  return {
    ...json,
    rates: {
      [currency]: 1,
      ...json.rates,
    },
  };
};

const useDateRates = (currency: Currency, date: string) => {
  const { data, error } = useSWR([currency, date], getCurrencyRatesForDate, {
    revalidateIfStale: false,
    refreshInterval: 300000,
    dedupingInterval: 300000,
  });

  return {
    data,
    isError: error,
    isLoading: !error && !data,
  };
};

export default useDateRates;
