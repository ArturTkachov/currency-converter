import React, { FC, useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';
import { getCurrencyRatesForDate } from 'hooks/useDateRates';
import { getFormattedDateString } from 'utility/getFormattedDateString';
import {
  getNormalizedRates,
  NormalizedRates,
} from 'utility/getNormalizedRates';
import { getExchangeRates } from 'hooks/useExchangeRates';
import { ExchangeRates } from 'types/api';
import { Currency } from 'types/Currency';
import { Period } from 'types/Period';

interface Props {
  period: Period;
  from: Currency;
  to: Currency;
}

const PeriodRateChart: FC<Props> = React.memo((props) => {
  const { period, from, to } = props;

  const shifts = {
    '1w': 86400000,
    '1m': 86400000,
    '1y': 86400000 * 30,
  };
  const iterations = {
    '1w': 7,
    '1m': 30,
    '1y': 12,
  };

  const shift = shifts[period];
  const iterNum = iterations[period];

  const [data, setData] = useState<NormalizedRates[]>([]);
  useEffect(() => {
    const promises: Promise<ExchangeRates>[] = [];
    for (let i = iterNum; i >= 1; i--) {
      const date = new Date(Date.now() - shift * i);
      const dateString = getFormattedDateString(date);
      promises.push(getCurrencyRatesForDate(from, dateString));
    }
    promises.push(getExchangeRates(from));
    Promise.all(promises).then((data) => setData(getNormalizedRates(data, to)));
  }, [period, from, to]);

  return (
    <ResponsiveContainer width="100%" aspect={2.5}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="#4e8cd2"
          strokeWidth={3.5}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

export default PeriodRateChart;
