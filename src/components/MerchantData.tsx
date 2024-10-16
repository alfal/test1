import React, { useState, useMemo } from 'react';
import { Users, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface MerchantDataProps {
  onMerchantSelect: (merchantId: number) => void;
}

const mockMerchantData = [
  { id: 1, name: '商户A', totalPayments: 100000, transactionCount: 500, successRate: 99.5, mainChannel: '信用卡', secondaryChannel: '微信支付', growthRate: 5.2 },
  { id: 2, name: '商户B', totalPayments: 80000, transactionCount: 400, successRate: 99.2, mainChannel: '支付宝', secondaryChannel: '银联', growthRate: -2.1 },
  { id: 3, name: '商户C', totalPayments: 120000, transactionCount: 600, successRate: 99.8, mainChannel: '微信支付', secondaryChannel: '信用卡', growthRate: 6.1 },
  { id: 4, name: '商户D', totalPayments: 90000, transactionCount: 450, successRate: 99.6, mainChannel: '银联', secondaryChannel: '支付宝', growthRate: -1.5 },
  { id: 5, name: '商户E', totalPayments: 110000, transactionCount: 550, successRate: 99.7, mainChannel: '微信支付', secondaryChannel: '信用卡', growthRate: 5.8 },
  { id: 6, name: '商户F', totalPayments: 95000, transactionCount: 475, successRate: 99.4, mainChannel: '支付宝', secondaryChannel: '微信支付', growthRate: 0.3 },
  { id: 7, name: '商户G', totalPayments: 105000, transactionCount: 525, successRate: 99.6, mainChannel: '信用卡', secondaryChannel: '银联', growthRate: 5.6 },
  { id: 8, name: '商户H', totalPayments: 85000, transactionCount: 425, successRate: 99.3, mainChannel: '银联', secondaryChannel: '支付宝', growthRate: -0.9 },
  { id: 9, name: '商户I', totalPayments: 115000, transactionCount: 575, successRate: 99.7, mainChannel: '微信支付', secondaryChannel: '信用卡', growthRate: 5.9 },
  { id: 10, name: '商户J', totalPayments: 98000, transactionCount: 490, successRate: 99.5, mainChannel: '支付宝', secondaryChannel: '微信支付', growthRate: 3.2 },
];

const MerchantData: React.FC<MerchantDataProps> = ({ onMerchantSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('totalPayments');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedData = useMemo(() => {
    return mockMerchantData
      .filter(merchant =>
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const top10Data = useMemo(() => {
    return [...mockMerchantData].sort((a, b) => b.totalPayments - a.totalPayments).slice(0, 10);
  }, []);

  const chartData = {
    labels: top10Data.map(merchant => merchant.name),
    datasets: [
      {
        label: '交易金额',
        data: top10Data.map(merchant => merchant.totalPayments),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        yAxisID: 'y',
      },
      {
        label: '交易数量',
        data: top10Data.map(merchant => merchant.transactionCount),
        borderColor: 'rgb(255, 99, 132)',
        type: 'line' as const,
        yAxisID: 'y1',
      },
      {
        label: '7天平均交易金额',
        data: top10Data.map(merchant => merchant.totalPayments * 0.95),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        yAxisID: 'y',
      },
      {
        label: '7天平均交易数量',
        data: top10Data.map(merchant => merchant.transactionCount * 0.95),
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
      <h2 className="text-2xl font-semibold mb-4">商户数据</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">前10名商户交易数据</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索商户..."
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
                商户名称 {renderSortIcon('name')}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                主收入渠道
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                次收入渠道
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('growthRate')}>
                增长率 {renderSortIcon('growthRate')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.map((merchant) => (
              <tr key={merchant.id} onClick={() => onMerchantSelect(merchant.id)} className="cursor-pointer hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Users className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{merchant.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">¥{merchant.totalPayments.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{merchant.transactionCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{merchant.successRate}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {merchant.mainChannel}
                  <br />
                  <span className="text-xs text-gray-500">
                    ¥{(merchant.totalPayments * 0.6).toLocaleString()} / {Math.round(merchant.transactionCount * 0.6)}笔
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {merchant.secondaryChannel}
                  <br />
                  <span className="text-xs text-gray-500">
                    ¥{(merchant.totalPayments * 0.3).toLocaleString()} / {Math.round(merchant.transactionCount * 0.3)}笔
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${merchant.growthRate > 0 ? 'text-green-600' : merchant.growthRate < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  {merchant.growthRate > 0 ? '+' : ''}{merchant.growthRate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MerchantData;