"use client"; // Add this line at the very top

import React, { useEffect, useState } from 'react';
import { Card, Text, Table, LineChart, Grid, Metric } from '@tremor/react'; // Import Tremor components

const NoticesList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/notices')
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Prepare data for the LineChart
  const chartData = notices.map((notice) => ({
    date: new Date(notice.item_publishedDate).toLocaleDateString(),
    value: notice.item_awardedValue,
  }));

  return (
    <div className="p-6">
      <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-6">
        {/* First Card: Metric Overview */}
        <Card>
          <Text size="lg" weight="bold">Notices Overview</Text>
          <Metric className="mt-4">Total Notices: {notices.length}</Metric>
        </Card>

        {/* Second Card: LineChart Visualization */}
        <Card>
          <Text size="lg" weight="bold">Awarded Value Over Time</Text>
          <LineChart
            className="mt-4"
            data={chartData}
            index="date"
            categories={["value"]}
            colors={["blue"]}
            valueFormatter={(value) => `£${value.toLocaleString()}`}
            showLegend={false}
          />
        </Card>
      </Grid>

      {/* Third Card: Detailed Table */}
      <Card className="mt-6">
        <Text size="lg" weight="bold">Notices Details</Text>
        <Table className="mt-4">
          <thead>
            <tr>
              <th>Awarded Supplier</th>
              <th>Published Date</th>
              <th>Awarded Value</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.item_id} className="border border-gray-200">
                <td className="border border-gray-200 p-2">{notice.item_awardedSupplier}</td>
                <td className="border border-gray-200 p-2">{new Date(notice.item_publishedDate).toLocaleDateString()}</td>
                <td className="border border-gray-200 p-2">£{notice.item_awardedValue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default NoticesList;
