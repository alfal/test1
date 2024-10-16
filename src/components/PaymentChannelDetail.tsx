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

interface PaymentChannelDetailProps {
  channelId: number;
}

const PaymentChannelDetail: React.FC<PaymentChannelDetailProps> = ({ channelId }) => {
  const [timeRange, setTimeRange] = useState('hourly');

  // 模拟支付通道数据
  const channelData = {
    id: channelId,
    name: '支付宝',
    totalPayments: 500000,
    transactionCount: 2500,
    averageTransaction: 200,
    successRate: 99.8,
    growthRate: 5.2,
  };

  const getChartData = () => {
    // 这里应该根据 timeRange 和 channelId 获取实际数据
    // 现在我们使用模拟数据
    const baseData = {
      hourly: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        current: [25000, 20000, 30000, 35000, 27500, 24000, 15000, 25000, 20000, 30000, 35000, 27500],
        average: [24000, 19000, 28500, 33500, 26000, 22500, 14000, 24000, 19000, 28500, 33500, 26000],
      },
      daily: {
        labels: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        current: [400000, 475000, 440000, 510000, 425000, 550000, 375000],
        average: [380000, 450000, 420000, 485000, 405000, 525000, 355000],
      },
      weekly: {
        labels: Array.from({ length: 52 }, (_, i) => `第${i + 1}周`),
        current: Array.from({ length: 52 }, () => Math.floor(Math.random() * 2500000) + 1500000),
        average: Array.from({ length: 52 }, () => Math.floor(Math.random() * 2250000) + 1350000),
      },
      monthly: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        current: [7500000, 7000000, 8000000, 7750000, 8500000, 8250000, 9000000, 8750000, 9500000, 9250000, 10000000, 9750000],
        average: [7250000, 6750000, 7750000, 7500000, 8250000, 8000000, 8750000, 8500000, 9250000, 9000000, 9750000, 9500000],
      },
      yearly: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        current: [75000000, 70000000, 80000000, 90000000, 100000000],
        average: [72500000, 67500000, 77500000, 87500000, 97500000],
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
        text: `支付通道 ${channelData.name} 的${
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

  const getMerchantData = () => {
    // 这里应该根据 channelId 获取实际数据
    // 现在我们使用模拟数据
    return [
      { name: '商户A', amount: 150000, count: 750 },
      { name: '商户B', amount: 100000, count: 500 },
      { name: '商户C', amount: 80000, count: 400 },
      { name: '商户D', amount: 70000, count: 350 },
      { name: '商户E', amount: 60000, count: 300 },
    ];
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">支付通道 {channelData.name} 详情</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800">总交易额</h3>
            <p className="text-2xl font-bold text-blue-900">¥{channelData.totalPayments.toLocaleString()}</p>
            <p className="text-sm text-blue-700">较昨日 +5.2%</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800">总交易量</h3>
            <p className="text-2xl font-bold text-green-900">{channelData.transactionCount}</p>
            <p className="text-sm text-green-700">较昨日 +3.8%</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-yellow-800">平均交易额</h3>
            <p className="text-2xl font-bold text-yellow-900">¥{channelData.averageTransaction.toFixed(2)}</p>
            <p className="text-sm text-yellow-700">较昨日 +1.5%</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-800">成功率</h3>
            <p className="text-2xl font-bold text-purple-900">{channelData.successRate}%</p>
            <p className="text-sm text-purple-700">较昨日 +0.1%</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-800">增长率</h3>
            <p className="text-2xl font-bold text-indigo-900">{channelData.growthRate}%</p>
            <p className="text-sm text-indigo-700">较昨日 +0.2%</p>
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
        <h3 className="text-xl font-semibold mb-4">商户占比数据</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商户名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">占比</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getMerchantData().map((merchant, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{merchant.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">¥{merchant.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{merchant.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {((merchant.amount / getMerchantData().reduce((sum, m) => sum + m.amount, 0)) * 100).toFixed(2)}%
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

export default PaymentChannelDetail;