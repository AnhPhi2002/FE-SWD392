export interface Column {
    title: string;
    dataIndex: string;
    key: string;
  }
  
  export const columns: Column[] = [
    { title: 'Total Revenue', dataIndex: 'total_revenue', key: 'total_revenue' },
    { title: 'Total Orders', dataIndex: 'total_orders', key: 'total_orders' },
  ];
  