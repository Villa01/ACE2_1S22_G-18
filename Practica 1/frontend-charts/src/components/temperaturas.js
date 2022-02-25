import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Temperaturas = (props) => {
  return (
    <>
      <ResponsiveContainer width="80%" aspect={3}>
          <LineChart
              width={500}
              height={300}
              data={props.data}
              margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
              }}
          >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp1" stroke="#9e0606" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="temp2" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
      </ResponsiveContainer>
    </>
  )
}
