// src/pages/TrackingPage.tsx
import React, { useState } from 'react';

type StepKeys = 'step1' | 'step2' | 'step3';

const TrackingPage: React.FC = () => {
  const [steps, setSteps] = useState<Record<StepKeys, boolean>>({
    step1: false,
    step2: false,
    step3: false,
  });

  const toggleStep = (step: StepKeys) => {
    setSteps(prevSteps => ({
      ...prevSteps,
      [step]: !prevSteps[step],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Mã Đơn Hàng: 230410Q5AYQD3T</h2>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer ${
                steps.step1 ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-200'
              }`}
              onClick={() => toggleStep('step1')}
            >
              <i className="fas fa-receipt"></i>
            </div>
            <span className="block">Đơn Hàng Đã Đặt</span>
            <span className="block text-sm text-gray-500">10:38 10-04-2023</span>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center">
            {/* <div className={`h-1 w-full mx-6 ${steps.step1 && steps.step2 ? 'bg-green-500' : 'bg-gray-400'}`}></div> */}
          </div>
          <div className="relative flex justify-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer ${
                steps.step2 ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-200'
              }`}
              onClick={() => toggleStep('step2')}
            >
              <i className="fas fa-money-check-alt"></i>
            </div>
          </div>
          <div className="text-center">
            <span className="block">Đã Xác Nhận </span>
            <span className="block text-sm text-gray-500">11:08 10-04-2023</span>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center">
            {/* <div className={`h-1 w-full mx-6 ${steps.step2 && steps.step3 ? 'bg-green-500' : 'bg-gray-400'}`}></div> */}
          </div>
          <div className="relative flex justify-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer ${
                steps.step3 ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-200'
              }`}
              onClick={() => toggleStep('step3')}
            >
              <i className="fas fa-truck"></i>
            </div>
          </div>
          <div className="text-center">
            <span className="block">Vận Chuyển</span>
            <span className="block text-sm text-gray-500">11:08 10-04-2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
  