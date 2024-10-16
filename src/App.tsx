import React, { useState } from 'react';
import MerchantData from './components/MerchantData';
import PaymentChannelData from './components/PaymentChannelData';
import Overview from './components/Overview';
import MerchantDetail from './components/MerchantDetail';
import PaymentChannelDetail from './components/PaymentChannelDetail';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMerchantId, setSelectedMerchantId] = useState<number | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<number | null>(null);

  const tabs = [
    { id: 'overview', name: '总览' },
    { id: 'merchants', name: '商户数据' },
    { id: 'channels', name: '支付通道数据' },
  ];

  const handleMerchantSelect = (merchantId: number) => {
    setSelectedMerchantId(merchantId);
    setActiveTab('merchantDetail');
  };

  const handleChannelSelect = (channelId: number) => {
    setSelectedChannelId(channelId);
    setActiveTab('channelDetail');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">支付数据报表</h1>
      <div className="mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 mr-4 rounded-md ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'merchants' && <MerchantData onMerchantSelect={handleMerchantSelect} />}
        {activeTab === 'channels' && <PaymentChannelData onChannelSelect={handleChannelSelect} />}
        {activeTab === 'merchantDetail' && selectedMerchantId && (
          <MerchantDetail merchantId={selectedMerchantId} />
        )}
        {activeTab === 'channelDetail' && selectedChannelId && (
          <PaymentChannelDetail channelId={selectedChannelId} />
        )}
      </div>
    </div>
  );
}

export default App;