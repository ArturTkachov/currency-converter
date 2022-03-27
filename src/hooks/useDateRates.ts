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

  return await res.json();
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
