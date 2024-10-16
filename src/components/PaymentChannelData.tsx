import React, { useState, useMemo } from 'react';
import { CreditCard, Smartphone, Building, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

interface PaymentChannelDataProps {
  onChannelSelect: (channelId: number) => void;
}

const mockChannelData = [
  { id: 1, name: '信用卡', totalPayments: 250000, transactionCount: 1800, icon: CreditCard, successRate: 99.8, growthRate: 5.2 },
  { id: 2, name: '移动支付', totalPayments: 180000, transactionCount: 2200, icon: Smartphone, successRate: 99.5, growthRate: 7.8 },
  { id: 3, name: '银行转账', totalPayments: 120000, transactionCount: 600, icon: Building, successRate: 99.9, growthRate: -1.5 },
  { id: 4, name: '微信支付', totalPayments: 160000, transactionCount: 2000, icon: Smartphone, successRate: 99.7, growthRate: 6.3 },
  { id: 5, name: '支付宝', totalPayments: 140000, transactionCount: 1800, icon: Smartphone, successRate: 99.6, growthRate: 4.9 },
];

const PaymentChannelData: React.FC<PaymentChannelDataProps> = ({ onChannelSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('totalPayments');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedData = useMemo(() => {
    return mockChannelData
      .filter(channel =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [searchTerm, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const renderSortIcon = (column: string) => {
    if (column !== sortColumn) {
      return <ArrowUpDown className="w-4 h-4 inline-block ml-1" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 inline-block ml-1 text-blue-500" />
    ) : (
      <ArrowDown className="w-4 h-4 inline-block ml-1 text-blue-500" />
    );
  };

  const top5Data = useMemo(() => {
    return [...mockChannelData].sort((a, b) => b.totalPayments - a.totalPayments).slice(0, 5);
  }, []);

  const chartData = {
    labels: top5Data.map(channel => channel.name),
    datasets: [
      {
        label: '交易金额',
        data: top5Data.map(channel => channel.totalPayments),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        yAxisID: 'y',
      },
      {
        label: '交易数量',
        data: top5Data.map(channel => channel.transactionCount),
        borderColor: 'rgb(255, 99, 132)',
        type: 'line' as const,
        yAxisID: 'y1',
      },
      {
        label: '7天平均交易金额',
        data: top5Data.map(channel => channel.totalPayments * 0.95),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        yAxisID: 'y',
      },
      {
        label: '7天平均交易数量',
        data: top5Data.map(channel => channel.transactionCount * 0.95),
        borderColor: 'rgb(54, 162, 235)',
        type: 'line' as const,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '交易金额 (元)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: '交易数量',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">支付通道数据</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">前5名支付通道交易数据</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索支付通道..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                支付通道 {renderSortIcon('name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('totalPayments')}>
                总交易额 {renderSortIcon('totalPayments')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('transactionCount')}>
                交易笔数 {renderSortIcon('transactionCount')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('successRate')}>
                成功率 {renderSortIcon('successRate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('growthRate')}>
                增长率 {renderSortIcon('growthRate')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.map((channel) => (
              <tr key={channel.id} onClick={() => onChannelSelect(channel.id)} className="cursor-pointer hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <channel.icon className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{channel.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">¥{channel.totalPayments.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{channel.transactionCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{channel.successRate}%</td>
                <td className={`px-6 py-4 whitespace-nowrap ${channel.growthRate > 0 ? 'text-green-600' : channel.growthRate < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  {channel.growthRate > 0 ? '+' : ''}{channel.growthRate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentChannelData;