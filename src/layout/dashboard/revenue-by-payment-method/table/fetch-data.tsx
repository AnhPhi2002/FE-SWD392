export async function fetchRevenueByPaymentMethod() {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:5000/api/statistics/revenue-by-payment-method', {
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
  