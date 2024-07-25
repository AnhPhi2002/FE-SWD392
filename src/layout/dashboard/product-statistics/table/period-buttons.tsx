import React from 'react';

export interface PeriodButtonsProps {
  setPeriod: (period: string) => void;
}

export function PeriodButtons({ setPeriod }: PeriodButtonsProps) {
  return (
    <div className="mb-4">
      <button
        onClick={() => setPeriod('day')}
        className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Day
      </button>
      <button
        onClick={() => setPeriod('week')}
        className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Week
      </button>
      <button
        onClick={() => setPeriod('month')}
        className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Month
      </button>
      <button
        onClick={() => setPeriod('year')}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Year
      </button>
    </div>
  );
}
