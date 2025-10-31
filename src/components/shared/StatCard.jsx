import React from 'react';
import Card from './Card';
import CountUp from 'react-countup';

/**
 * Stat Card Component for Dashboard
 * Displays key metrics with optional trend indicator
 */

const StatCard = ({
  label,
  value,
  suffix = '',
  prefix = '',
  change,
  changeType = 'neutral', // 'positive' | 'negative' | 'neutral'
  icon,
  loading = false,
  animateValue = false,
}) => {
  const changeColors = {
    positive: 'text-[#16A34A]',
    negative: 'text-[#DC2626]',
    neutral: 'text-[#666666]',
  };
  
  if (loading) {
    return (
      <Card padding="md" className="animate-pulse">
        <div className="h-4 w-20 bg-[#F5F5F5] rounded mb-3" />
        <div className="h-8 w-32 bg-[#F5F5F5] rounded" />
      </Card>
    );
  }
  
  return (
    <Card padding="md" hover>
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-[#666666]">{label}</span>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-[#FAFAFA] flex items-center justify-center text-[#1A1A1A]">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-semibold text-[#1A1A1A] tabular-nums">
          {prefix}
          {animateValue && typeof value === 'number' ? (
            <CountUp end={value} duration={1.5} separator="," />
          ) : (
            value
          )}
          {suffix}
        </h3>
        
        {change !== undefined && (
          <span className={`text-xs font-medium ${changeColors[changeType]}`}>
            {changeType === 'positive' && '+'}
            {change}
          </span>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
