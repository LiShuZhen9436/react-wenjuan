/**
 * Checkbox 的统计图组件
 */
import React, { FC } from 'react';
import { BarChart, Tooltip, Bar, YAxis, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { QuestionCheckboxStatPropsType } from './interface';

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
  return (
    <div style={{ width: '400px', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={stat}
          margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
