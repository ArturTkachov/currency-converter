import useSWR from 'swr';
import { Currency } from 'types/Currency';
import { ExchangeRates } from 'types/api';

export const getExchangeRates = async (
  currency: Currency
): Promise<ExchangeRates> => {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.toLowerCase()}.min.json`
  );
  return await res.json();
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
