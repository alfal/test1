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

const Overview: React.FC = () => {
  const [timeRange, setTimeRange] = useState('hourly');

  const getChartData = () => {
    switch (timeRange) {
      case 'hourly':
        return {
          labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          datasets: [
            {
              type: 'bar' as const,
              label: '交易额',
              data: [65000, 59000, 80000, 81000, 56000, 55000, 40000, 65000, 59000, 80000, 81000, 56000],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '交易量',
              data: [120, 110, 150, 155, 100, 95, 80, 120, 110, 150, 155, 100],
              borderColor: 'rgb(255, 99, 132)',
              yAxisID: 'y1',
            },
            {
              type: 'bar' as const,
              label: '7天平均交易额',
              data: [62000, 57000, 75000, 78000, 54000, 53000, 38000, 62000, 57000, 75000, 78000, 54000],
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '7天平均交易量',
              data: [115, 105, 140, 145, 95, 90, 75, 115, 105, 140, 145, 95],
              borderColor: 'rgb(54, 162, 235)',
              yAxisID: 'y1',
            },
          ],
        };
      case 'daily':
        return {
          labels: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          datasets: [
            {
              type: 'bar' as const,
              label: '本周交易额',
              data: [1200000, 1500000, 1400000, 1600000, 1300000, 1700000, 1100000],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '本周交易量',
              data: [5000, 6200, 5800, 6500, 5500, 7000, 4800],
              borderColor: 'rgb(255, 99, 132)',
              yAxisID: 'y1',
            },
            {
              type: 'bar' as const,
              label: '前7天平均交易额',
              data: [1150000, 1450000, 1350000, 1550000, 1250000, 1650000, 1050000],
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '前7天平均交易量',
              data: [4800, 6000, 5600, 6300, 5300, 6800, 4600],
              borderColor: 'rgb(54, 162, 235)',
              yAxisID: 'y1',
            },
          ],
        };
      case 'weekly':
        return {
          labels: Array.from({ length: 52 }, (_, i) => `第${i + 1}周`),
          datasets: [
            {
              type: 'bar' as const,
              label: '本年交易额',
              data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 10000000) + 5000000),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '本年交易量',
              data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 50000) + 20000),
              borderColor: 'rgb(255, 99, 132)',
              yAxisID: 'y1',
            },
            {
              type: 'bar' as const,
              label: '上年同期交易额',
              data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 9000000) + 4500000),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '上年同期交易量',
              data: Array.from({ length: 52 }, () => Math.floor(Math.random() * 45000) + 18000),
              borderColor: 'rgb(54, 162, 235)',
              yAxisID: 'y1',
            },
          ],
        };
      case 'monthly':
        return {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          datasets: [
            {
              type: 'bar' as const,
              label: '本年交易额',
              data: [30000000, 28000000, 35000000, 32000000, 40000000, 38000000, 42000000, 45000000, 41000000, 38000000, 43000000, 48000000],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '本年交易量',
              data: [150000, 140000, 170000, 160000, 200000, 190000, 210000, 220000, 205000, 190000, 215000, 240000],
              borderColor: 'rgb(255, 99, 132)',
              yAxisID: 'y1',
            },
            {
              type: 'bar' as const,
              label: '上年同期交易额',
              data: [28000000, 26000000, 33000000, 30000000, 38000000, 36000000, 40000000, 43000000, 39000000, 36000000, 41000000, 46000000],
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '上年同期交易量',
              data: [140000, 130000, 160000, 150000, 190000, 180000, 200000, 210000, 195000, 180000, 205000, 230000],
              borderColor: 'rgb(54, 162, 235)',
              yAxisID: 'y1',
            },
          ],
        };
      case 'yearly':
        return {
          labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
          datasets: [
            {
              type: 'bar' as const,
              label: '交易额',
              data: [300000000, 350000000, 400000000, 380000000, 450000000, 500000000, 550000000],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              yAxisID: 'y',
            },
            {
              type: 'line' as const,
              label: '交易量',
              data: [1500000, 1750000, 2000000, 1900000, 2250000, 2500000, 2750000],
              borderColor: 'rgb(255, 99, 132)',
              yAxisID: 'y1',
            },
          ],
        };
      default:
        return { labels: [], datasets: [] };
    }
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
        text: `${timeRange === 'hourly' ? '每小时' : timeRange === 'daily' ? '每天' : timeRange === 'weekly' ? '每周' : timeRange === 'monthly' ? '每月' : '每年'}交易数据`,
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

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">今日总览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800">总交易额</h3>
            <p className="text-2xl font-bold text-blue-900">¥1,234,567</p>
            <p className="text-sm text-blue-700">较昨日 +5.2%</p>
            <p className="text-sm text-blue-600">7天平均: ¥1,150,000</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800">总交易量</h3>
            <p className="text-2xl font-bold text-green-900">5,678</p>
            <p className="text-sm text-green-700">较昨日 +3.8%</p>
            <p className="text-sm text-green-600">7天平均: 5,200</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-yellow-800">平均交易额</h3>
            <p className="text-2xl font-bold text-yellow-900">¥217.43</p>
            <p className="text-sm text-yellow-700">较昨日 +1.5%</p>
            <p className="text-sm text-yellow-600">7天平均: ¥221.15</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-800">订单成功率</h3>
            <p className="text-2xl font-bold text-purple-900">99.8%</p>
            <p className="text-sm text-purple-700">较昨日 +0.1%</p>
            <p className="text-sm text-purple-600">7天平均: 99.7%</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-800">支付成功率</h3>
            <p className="text-2xl font-bold text-indigo-900">98.5%</p>
            <p className="text-sm text-indigo-700">较昨日 +0.2%</p>
            <p className="text-sm text-indigo-600">7天平均: 98.3%</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-red-800">异常订单数</h3>
            <p className="text-2xl font-bold text-red-900">23</p>
            <p className="text-sm text-red-700">较昨日 -15%</p>
            <p className="text-sm text-red-600">7天平均: 27</p>
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
    </div>
  );
};

export default Overview;