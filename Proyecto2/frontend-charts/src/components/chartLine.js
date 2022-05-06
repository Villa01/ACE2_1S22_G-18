import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ChartLine = ({data, yAxis, xAxis}) => {
  return (
    <>
      <ResponsiveContainer width="80%" aspect={3}>
          <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
              }}
          >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke="#9e0606" activeDot={{ r: 8 }} />
          </LineChart>
      </ResponsiveContainer>
    </>
  )
}
