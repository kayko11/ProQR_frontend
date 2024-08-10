import React, { useState } from 'react';
import { Grid } from '@tremor/react';
import MetricSelector from './MetricSelector';
import MetricCard from './MetricCard';
import LineChartComponent from './LineChartComponent';
import DataTable from './DataTable';

const Dashboard = () => {
  const availableMetrics = ['Total Awarded Value', 'Average Awarded Value', 'Number of Notices', 'Top Suppliers', 'Recent Notices'];
  const [selectedMetrics, setSelectedMetrics] = useState(['Total Awarded Value', 'Top Suppliers']);
  
  return (
    <div className="p-6">
      <MetricSelector
        availableMetrics={availableMetrics}
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
      />

      <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-6">
        {selectedMetrics.includes('Total Awarded Value') && (
          <MetricCard title="Total Awarded Value" value={totalAwardedValue} />
        )}
        {selectedMetrics.includes('Average Awarded Value') && (
          <MetricCard title="Average Awarded Value" value={averageAwardedValue} />
        )}
        {selectedMetrics.includes('Top Suppliers') && (
          <LineChartComponent data={topSuppliersData} />
        )}
        {/* Add other metrics as needed */}
      </Grid>

      {/* Detailed Data Table */}
      <DataTable data={notices} />
    </div>
  );
};

export default Dashboard;
