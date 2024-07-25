export interface RevenueData {
    total_revenue: number;
    total_orders: number;
    period: string | number;
  }
  
  export async function fetchData(period: string, startDate: string, endDate: string): Promise<RevenueData[]> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found in local storage');
    }
  
    const response = await fetch(`http://localhost:5000/api/statistics/revenue-statistics?period=${period}&startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Failed to fetch data:', errorResponse.message);
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
  
    // Chuyển đổi dữ liệu số thành chuỗi cho trường hợp 'week'
    if (period === 'week') {
      return data.map((item: RevenueData) => ({
        ...item,
        period: typeof item.period === 'number' 
          ? `${Math.floor(item.period / 100)}-W${(item.period % 100).toString().padStart(2, '0')}`
          : item.period
      }));
    }
  
    return data;
  }