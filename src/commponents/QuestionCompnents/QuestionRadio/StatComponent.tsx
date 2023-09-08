import React, { FC } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { QuestionRadioStatPropsType } from './interface';

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={(i) => `${i.name}:${i.count}`}
          ></Pie>
          {stat.map((i, index) => {
            return (
              <Cell
                key={index}
                fill={['red', 'yellow', 'blue', 'black', '#8130200', '#20987670'][index]}
              ></Cell>
            );
          })}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
