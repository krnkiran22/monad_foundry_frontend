import React from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

/**
 * Enterprise-grade Table Component
 * Follows Corporate Minimalism design system
 * 
 * Features:
 * - Sortable columns
 * - Hover states
 * - Empty states
 * - Loading states
 * - Responsive
 */

const Table = ({
  columns = [],
  data = [],
  sortable = false,
  sortColumn = null,
  sortDirection = 'asc',
  onSort = () => {},
  emptyMessage = 'No data available',
  loading = false,
  className = '',
}) => {
  const handleSort = (columnKey) => {
    if (!sortable || !columnKey) return;
    
    const newDirection = 
      sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    
    onSort(columnKey, newDirection);
  };
  
  if (loading) {
    return (
      <div className={`w-full border border-[#E5E5E5] rounded-lg overflow-hidden ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                {columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-3 text-left text-xs font-semibold text-[#666666] uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E5E5E5]">
              {[...Array(5)].map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  {columns.map((_, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      <div className="h-4 bg-[#F5F5F5] rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  if (!data.length) {
    return (
      <div className={`w-full border border-[#E5E5E5] rounded-lg overflow-hidden ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                {columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-3 text-left text-xs font-semibold text-[#666666] uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        <div className="bg-white p-12 text-center">
          <p className="text-[#999999]">{emptyMessage}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`w-full border border-[#E5E5E5] rounded-lg overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`
                    px-6 py-3 text-left text-xs font-semibold text-[#666666] uppercase tracking-wider
                    ${sortable && col.sortable !== false ? 'cursor-pointer hover:bg-[#F5F5F5] select-none' : ''}
                  `}
                  style={{ width: col.width || 'auto' }}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    {sortable && col.sortable !== false && (
                      <span className="text-[#999999]">
                        {sortColumn === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-4 h-4 opacity-40" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#E5E5E5]">
            {data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                className="hover:bg-[#FAFAFA] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-sm text-[#1A1A1A]"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
