import { ColumnDef, flexRender, getCoreRowModel, useReactTable, TableMeta } from '@tanstack/react-table';
import { useState } from 'react';
import ModalForm from './ModalForm';
import { Order } from './orderColumns';

interface DataTableProps {
  columns: ColumnDef<Order>[];
  data: Order[];
  refreshData: () => void;
  userMap: Record<number, string>;
}

interface CustomTableMeta extends TableMeta<Order> {
  refreshData: () => void;
  userMap: Record<number, string>;
}

export function DataTable({ columns, data, refreshData, userMap }: DataTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const table = useReactTable<Order>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      refreshData,
      userMap,
    } as CustomTableMeta,
  });

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedOrder: Order) => {
    const token = localStorage.getItem('accessToken');
    await fetch('http://localhost:5000/api/orders/status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_id: updatedOrder.order_id,
        status: updatedOrder.status,
      }),
    });
    setIsModalOpen(false);
    await refreshData();
  };

  const handleDelete = async (orderId: number) => {
    const token = localStorage.getItem('accessToken');
    await fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    setIsModalOpen(false);
    await refreshData();
  };

  return (
    <div className="relative">
      <div className="rounded-md border h-[50vh] overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} onClick={() => handleRowClick(row.original)} className="cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <ModalForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          onSave={handleSave}
          onDelete={handleDelete}
          userMap={userMap}
        />
      )}
    </div>
  );
}
