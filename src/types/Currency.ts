export type Currency = 'USD' | 'BYN' | 'RUB';
export type Currencies = ['USD', 'BYN', 'RUB'];
type CurrencySign = '$' | 'Br' | '₽';
export type CurrencySignsMap = {
  [key in Currency]: CurrencySign;
};
