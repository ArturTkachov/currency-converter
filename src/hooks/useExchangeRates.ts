import useSWR from 'swr';
import { Currency } from 'types/Currency';
import { ExchangeRates } from 'types/api';

export const getExchangeRates = async (
  currency: Currency
): Promise<ExchangeRates> => {
  const res = await fetch(
    `https://api.frankfurter.app/latest?from=${currency}`
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

const useExchangeRates = (currency: Currency) => {
  const { data, error } = useSWR(currency, getExchangeRates, {
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

export default useExchangeRates;
