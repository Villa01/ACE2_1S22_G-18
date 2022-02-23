import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '1/1/1 00:00',
    temp1: 40,
    temp2: 20,
  },
  {
    name: '1/1/1 00:05',
    temp1: 80,
    temp2: 10,
  },
  {
    name: '1/1/1 00:10',
    temp1: 60,
    temp2: 40,
  },
  {
    name: '1/1/1 00:15',
    temp1: 90,
    temp2: 10,
  },
  {
    name: '1/1/1 00:20',
    temp1: 10,
    temp2: 80,
  },
  {
    name: '1/1/1 00:25',
    temp1: 40,
    temp2: 60,
  }
];

export const Temperaturas = () => {
  return (
    <>
        <h2>Grafica Temperaturas </h2>
        <ResponsiveContainer width="100%" aspect={3}>
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp1" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="temp2" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    </>
  )
}
