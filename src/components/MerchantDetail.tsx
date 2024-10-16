import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MerchantDetailProps {
  merchantId: number;
}

const MerchantDetail: React.FC<MerchantDetailProps> = ({ merchantId }) => {
  const [timeRange, setTimeRange] = useState('hourly');
  const [channelTimeRange, setChannelTimeRange] = useState('daily');

  // 模拟商户数据
  const merchantData = {
    id: merchantId,
    name: '商户A',
    totalPayments: 100000,
    transactionCount: 500,
    averageTransaction: 200,
    successRate: 99.5,
    paymentSuccessRate: 98.5,
    abnormalOrders: 5,
    channels: [
      { name: '支付宝', amount: 50000, count: 250 },
      { name: '微信支付', amount: 30000, count: 150 },
      { name: '银联', amount: 20000, count: 100 },
    ],
  };

  const getChartData = () => {
    // 这里应该根据 timeRange 和 merchantId 获取实际数据
    // 现在我们使用模拟数据
    const baseData = {
      hourly: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        current: [5000, 4000, 6000, 7000, 5500, 4800, 3000, 5000, 4000, 6000, 7000, 5500],
        average: [4800, 3800, 5700, 6700, 5200, 4500, 2800, 4800, 3800, 5700, 6700, 5200],
      },
      daily: {
        labels: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        current: [80000, 95000, 88000, 102000, 85000, 110000, 75000],
        average: [76000, 90000, 84000, 97000, 81000, 105000, 71000],
      },
      weekly: {
        labels: Array.from({ length: 52 }, (_, i) => `第${i + 1}周`),
        current: Array.from({ length: 52 }, () => Math.floor(Math.random() * 500000) + 300000),
        average: Array.from({ length: 52 }, () => Math.floor(Math.random() * 450000) + 280000),
      },
      monthly: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        current: [1500000, 1400000, 1600000, 1550000, 1700000, 1650000, 1800000, 1750000, 1900000, 1850000, 2000000, 1950000],
        average: [1450000, 1350000, 1550000, 1500000, 1650000, 1600000, 1750000, 1700000, 1850000, 1800000, 1950000, 1900000],
      },
      yearly: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        current: [15000000, 14000000, 16000000, 18000000, 20000000],
        average: [14500000, 13500000, 15500000, 17500000, 19500000],
      },
    };

    const data = baseData[timeRange];

    return {
      labels: data.labels,
      datasets: [
        {
          type: 'bar' as const,
          label: '当前交易额',
          data: data.current,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          yAxisID: 'y',
        },
        {
          type: 'line' as const,
          label: '当前交易量',
          data: data.current.map(val => val / 200), // 假设平均交易额为200
          borderColor: 'rgb(255, 99, 132)',
          yAxisID: 'y1',
        },
        {
          type: 'bar' as const,
          label: '平均交易额',
          data: data.average,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          yAxisID: 'y',
        },
        {
          type: 'line' as const,
          label: '平均交易量',
          data: data.average.map(val => val / 200),
          borderColor: 'rgb(54, 162, 235)',
          yAxisID: 'y1',
        },
      ],
    };
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `商户 ${merchantData.name} 的${
          timeRange === 'hourly' ? '每小时' : 
          timeRange === 'daily' ? '每天' : 
          timeRange === 'weekly' ? '每周' : 
          timeRange === 'monthly' ? '每月' : '每年'
        }交易数据`,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '交易额 (元)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: '交易量',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const getChannelData = () => {
    // 这里应该根据 channelTimeRange 获取实际数据
    // 现在我们使用模拟数据
    const baseData = {
      daily: [
        { name: '支付宝', amount: 50000, count: 250 },
        { name: '微信支付', amount: 30000, count: 150 },
        { name: '银联', amount: 20000, count: 100 },
      ],
      weekly: [
        { name: '支付宝', amount: 350000, count: 1750 },
        { name: '微信支付', amount: 210000, count: 1050 },
        { name: '银联', amount: 140000, count: 700 },
      ],
      monthly: [
        { name: '支付宝', amount: 1500000, count: 7500 },
        { name: '微信支付', amount: 900000, count: 4500 },
        { name: '银联', amount: 600000, count: 3000 },
      ],
      yearly: [
        { name: '支付宝', amount: 18000000, count: 90000 },
        { name: '微信支付', amount: 10800000, count: 54000 },
        { name: '银联', amount: 7200000, count: 36000 },
      ],
    };

    return baseData[channelTimeRange];
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">商户 {merchantData.name} 详情</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800">总交易额</h3>
            <p className="text-2xl font-bold text-blue-900">¥{merchantData.totalPayments.toLocaleString()}</p>
            <p className="text-sm text-blue-700">较昨日 +5.2%</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800">总交易量</h3>
            <p className="text-2xl font-bold text-green-900">{merchantData.transactionCount}</p>
            <p className="text-sm text-green-700">较昨日 +3.8%</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-yellow-800">平均交易额</h3>
            <p className="text-2xl font-bold text-yellow-900">¥{merchantData.averageTransaction.toFixed(2)}</p>
            <p className="text-sm text-yellow-700">较昨日 +1.5%</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-800">订单成功率</h3>
            <p className="text-2xl font-bold text-purple-900">{merchantData.successRate}%</p>
            <p className="text-sm text-purple-700">较昨日 +0.1%</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-800">支付成功率</h3>
            <p className="text-2xl font-bold text-indigo-900">{merchantData.paymentSuccessRate}%</p>
            <p className="text-sm text-indigo-700">较昨日 +0.2%</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-red-800">异常订单数</h3>
            <p className="text-2xl font-bold text-red-900">{merchantData.abnormalOrders}</p>
            <p className="text-sm text-red-700">较昨日 -15%</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <div className="flex space-x-4">
            {['hourly', 'daily', 'weekly', 'monthly', 'yearly'].map((range) => (
              <button
                key={range}
                className={`px-4 py-2 rounded-md ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range === 'hourly' ? '每小时' : 
                 range === 'daily' ? '每天' : 
                 range === 'weekly' ? '每周' : 
                 range === 'monthly' ? '每月' : '每年'}
              </button>
            ))}
          </div>
        </div>
        <Bar options={options} data={getChartData()} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">支付渠道数据</h3>
        <div className="mb-4">
          <div className="flex space-x-4">
            {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
              <button
                key={range}
                className={`px-4 py-2 rounded-md ${
                  channelTimeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setChannelTimeRange(range)}
              >
                {range === 'daily' ? '今日' : 
                 range === 'weekly' ? '本周' : 
                 range === 'monthly' ? '本月' : '今年'}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">渠道名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">占比</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getChannelData().map((channel, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{channel.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">¥{channel.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{channel.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {((channel.amount / getChannelData().reduce((sum, c) => sum + c.amount, 0)) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetail;