import React, { FC, useState } from 'react';
import PeriodRateChart from './PeriodRateChart';
import { Period } from 'types/Period';
import { Currency } from 'types/Currency';
import './SelectablePeriodRateChart.scss';

interface Props {
  from: Currency;
  to: Currency;
}

const SelectablePeriodRateChart: FC<Props> = React.memo((props) => {
  const periods: Period[] = ['1w', '1m', '3m', '6m', '1y'];
  const [activePeriod, setActivePeriod] = useState<Period>('1y');

  return (
    <div className="selectable-rate-chart">
      <ul>
        {periods.map((period) => (
          <li
            onClick={() => setActivePeriod(period)}
            className={period === activePeriod ? 'active' : ''}
          >
            <button>{period.toUpperCase()}</button>
          </li>
        ))}
      </ul>
      <PeriodRateChart period={activePeriod} from={props.from} to={props.to} />
    </div>
  );
});

export default SelectablePeriodRateChart;
