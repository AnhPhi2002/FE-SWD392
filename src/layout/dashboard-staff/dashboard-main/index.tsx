import React from 'react';

const DashboardMain: React.FC = () => {
  return (
    <div className="mt-12 px-6 py-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <div className="bg-white rounded-md shadow-md p-6">
          <h3 className="text-lg font-semibold">New Wins</h3>
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold">230</span>
            <span className="text-green-500 font-bold">↑25%</span>
          </div>
          <p className="text-gray-500">vs previous 30 days</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <h3 className="text-lg font-semibold">Trial-Win Rate</h3>
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold">9.86%</span>
            <span className="text-green-500 font-bold">↑25%</span>
          </div>
          <p className="text-gray-500">vs previous 30 days</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <h3 className="text-lg font-semibold">New MRR</h3>
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-bold">$25,690</span>
            <span className="text-green-500 font-bold">↑8.7%</span>
          </div>
          <p className="text-gray-500">vs previous 30 days</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-6">
          <h3 className="text-lg font-semibold">Page Views</h3>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-4xl font-bold">76%</div>
              <p className="text-gray-500">Organic Search</p>
            </div>
            <div className="flex-1">
              <div className="text-4xl font-bold">24%</div>
              <p className="text-gray-500">Direct</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md col-span-1 md:col-span-2 lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold">MRR Stats by Country</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mb-2"></div>
              <span>United States</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mb-2"></div>
              <span>Australia</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mb-2"></div>
              <span>Canada</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-400 rounded-full mb-2"></div>
              <span>United Kingdom</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md col-span-1 md:col-span-2 lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold">MRR</h3>
          <div className="flex flex-col justify-between h-full">
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="text-gray-500">Jan-Feb</div>
              <div className="text-gray-500">Mar-Apr</div>
              <div className="text-gray-500">May-Jun</div>
              <div className="text-gray-500">Jul-Aug</div>
              <div className="text-gray-500">Sep-Oct</div>
              <div className="bg-blue-500 h-12 rounded-md"></div>
              <div className="bg-orange-500 h-16 rounded-md"></div>
              <div className="bg-orange-500 h-16 rounded-md"></div>
              <div className="bg-orange-500 h-16 rounded-md"></div>
              <div className="bg-orange-500 h-12 rounded-md"></div>
            </div>
            <div className="flex items-end justify-between">
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;