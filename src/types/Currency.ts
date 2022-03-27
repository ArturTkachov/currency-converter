export type Currency = 'USD' | 'EUR' | 'CZK';
type CurrencySign = '$' | '€' | 'Kč';
export type CurrencySignsMap = {
  [key in Currency]: CurrencySign;
};
