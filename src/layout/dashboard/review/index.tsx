'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from './table/data-table';
import { fetchData, fetchUsers, Review, columns } from './table/reviewColumns';

export default function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userMap, setUserMap] = useState<Record<number, string>>({});

  const refreshData = async () => {
    try {
      const data = await fetchData();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const data = await fetchData();
        setReviews(data);
        const users = await fetchUsers();
        setUserMap(users);
      } catch (error) {
        console.error('Failed to initialize data:', error);
      }
    };

    initializeData();
  }, []);

  return (
    <div className="mt-[10%] bg-white px-6 py-4">
      <DataTable columns={columns} data={reviews} refreshData={refreshData} userMap={userMap} />
    </div>
  );
}


    // <div className="mt-[10%] bg-white px-6 py-4">

