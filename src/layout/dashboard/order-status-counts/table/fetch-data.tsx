export async function fetchProductStatistics() {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:5000/api/statistics/product-statistics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  
  export async function fetchOrderStatusCounts() {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:5000/api/statistics/order-status-counts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  